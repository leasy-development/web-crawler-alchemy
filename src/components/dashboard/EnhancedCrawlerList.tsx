
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Search, Edit, Trash2, MoreHorizontal, Download, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface Crawler {
  id: string;
  name: string;
  url: string;
  description?: string;
  status: 'Todo' | 'In Progress' | 'Ready for QA' | 'Completed' | 'Failed';
  created_at: string;
  updated_at: string;
}

const statusColors = {
  'Todo': 'bg-gray-500',
  'In Progress': 'bg-blue-500',
  'Ready for QA': 'bg-yellow-500',
  'Completed': 'bg-green-500',
  'Failed': 'bg-red-500',
};

export function EnhancedCrawlerList() {
  const { toast } = useToast();
  const [crawlers, setCrawlers] = useState<Crawler[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedCrawlers, setSelectedCrawlers] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchCrawlers();
  }, []);

  const fetchCrawlers = async () => {
    try {
      const { data, error } = await supabase
        .from('crawlers')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setCrawlers(data || []);
    } catch (error) {
      console.error('Error fetching crawlers:', error);
      toast({
        title: "Error",
        description: "Failed to fetch crawlers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteCrawler = async (id: string) => {
    try {
      const { error } = await supabase
        .from('crawlers')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setCrawlers(crawlers.filter(c => c.id !== id));
      setSelectedCrawlers(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      
      toast({
        title: "Success",
        description: "Crawler deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting crawler:', error);
      toast({
        title: "Error",
        description: "Failed to delete crawler",
        variant: "destructive",
      });
    }
  };

  const bulkUpdateStatus = async (status: string) => {
    if (selectedCrawlers.size === 0) return;

    try {
      const { error } = await supabase
        .from('crawlers')
        .update({ status, updated_at: new Date().toISOString() })
        .in('id', Array.from(selectedCrawlers));

      if (error) throw error;

      await fetchCrawlers();
      setSelectedCrawlers(new Set());
      
      toast({
        title: "Success",
        description: `${selectedCrawlers.size} crawler(s) updated successfully`,
      });
    } catch (error) {
      console.error('Error updating crawlers:', error);
      toast({
        title: "Error",
        description: "Failed to update crawlers",
        variant: "destructive",
      });
    }
  };

  const bulkDelete = async () => {
    if (selectedCrawlers.size === 0) return;

    try {
      const { error } = await supabase
        .from('crawlers')
        .delete()
        .in('id', Array.from(selectedCrawlers));

      if (error) throw error;

      setCrawlers(crawlers.filter(c => !selectedCrawlers.has(c.id)));
      setSelectedCrawlers(new Set());
      
      toast({
        title: "Success",
        description: `${selectedCrawlers.size} crawler(s) deleted successfully`,
      });
    } catch (error) {
      console.error('Error deleting crawlers:', error);
      toast({
        title: "Error",
        description: "Failed to delete crawlers",
        variant: "destructive",
      });
    }
  };

  const exportData = () => {
    const csvContent = [
      ['Name', 'URL', 'Status', 'Description', 'Created', 'Updated'],
      ...filteredCrawlers.map(c => [
        c.name,
        c.url,
        c.status,
        c.description || '',
        new Date(c.created_at).toLocaleDateString(),
        new Date(c.updated_at).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'crawlers.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredCrawlers = crawlers.filter(crawler => {
    const matchesSearch = crawler.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         crawler.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || crawler.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleCrawlerSelection = (crawlerId: string) => {
    setSelectedCrawlers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(crawlerId)) {
        newSet.delete(crawlerId);
      } else {
        newSet.add(crawlerId);
      }
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (selectedCrawlers.size === filteredCrawlers.length) {
      setSelectedCrawlers(new Set());
    } else {
      setSelectedCrawlers(new Set(filteredCrawlers.map(c => c.id)));
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Web Crawlers</h1>
          <p className="text-muted-foreground">Manage and monitor your web scraping crawlers</p>
        </div>
        <Link to="/crawler/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create New Crawler
          </Button>
        </Link>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search crawlers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-input bg-background rounded-md"
          >
            <option value="">All Statuses</option>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Ready for QA">Ready for QA</option>
            <option value="Completed">Completed</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={exportData}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          
          {selectedCrawlers.size > 0 && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Bulk Actions ({selectedCrawlers.size})
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => bulkUpdateStatus('Todo')}>
                    Mark as Todo
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => bulkUpdateStatus('In Progress')}>
                    Mark as In Progress
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => bulkUpdateStatus('Ready for QA')}>
                    Mark as Ready for QA
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => bulkUpdateStatus('Completed')}>
                    Mark as Completed
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => bulkUpdateStatus('Failed')}>
                    Mark as Failed
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={bulkDelete} className="text-destructive">
                    Delete Selected
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {filteredCrawlers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter ? 'No crawlers match your filters' : 'No crawlers created yet'}
              </p>
              <Link to="/crawler/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Crawler
                </Button>
              </Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedCrawlers.size === filteredCrawlers.length}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCrawlers.map((crawler) => (
                  <TableRow key={crawler.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedCrawlers.has(crawler.id)}
                        onCheckedChange={() => toggleCrawlerSelection(crawler.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{crawler.name}</TableCell>
                    <TableCell className="text-blue-600 hover:underline">
                      <a href={crawler.url} target="_blank" rel="noopener noreferrer">
                        {crawler.url}
                      </a>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${statusColors[crawler.status]} text-white`}>
                        {crawler.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(crawler.updated_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/crawler/${crawler.id}`}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => deleteCrawler(crawler.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
