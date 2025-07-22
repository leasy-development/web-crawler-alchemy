import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Search, LogOut, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

interface Crawler {
  id: string;
  name: string;
  url: string;
  description?: string;
  status: 'Todo' | 'In Progress' | 'Ready for QA' | 'Completed' | 'Failed';
  created_at: string;
}

const statusColors = {
  'Todo': 'bg-gray-500',
  'In Progress': 'bg-blue-500',
  'Ready for QA': 'bg-yellow-500',
  'Completed': 'bg-green-500',
  'Failed': 'bg-red-500',
};

export const Dashboard = () => {
  const { signOut, user } = useAuth();
  const { toast } = useToast();
  const [crawlers, setCrawlers] = useState<Crawler[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchCrawlers();
  }, []);

  const fetchCrawlers = async () => {
    try {
      const { data, error } = await supabase
        .from('crawlers')
        .select('*')
        .order('created_at', { ascending: false });

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

  const filteredCrawlers = crawlers.filter(crawler => {
    const matchesSearch = crawler.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         crawler.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || crawler.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <h1 className="text-2xl font-bold">AI Scraper Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {user?.email}
            </span>
            <Button variant="outline" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Controls */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <h2 className="text-3xl font-bold">Web Crawlers</h2>
            <Link to="/crawler/new">
              <Button className="w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Create New Crawler
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
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
        </div>

        {/* Crawlers Table */}
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
                    <TableHead>Name</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCrawlers.map((crawler) => (
                    <TableRow key={crawler.id}>
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
                        {new Date(crawler.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link to={`/crawler/${crawler.id}`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Delete Crawler</DialogTitle>
                              </DialogHeader>
                              <p>Are you sure you want to delete "{crawler.name}"? This action cannot be undone.</p>
                              <div className="flex justify-end gap-2 mt-4">
                                <DialogTrigger asChild>
                                  <Button variant="outline">Cancel</Button>
                                </DialogTrigger>
                                <Button 
                                  variant="destructive" 
                                  onClick={() => deleteCrawler(crawler.id)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};