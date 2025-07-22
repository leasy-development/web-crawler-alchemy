
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CrawlerFormData {
  name: string;
  url: string;
  description: string;
  status: 'Todo' | 'In Progress' | 'Ready for QA' | 'Completed' | 'Failed';
}

export const CrawlerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState<CrawlerFormData>({
    name: '',
    url: '',
    description: '',
    status: 'Todo',
  });

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      fetchCrawler();
    }
  }, [id]);

  const fetchCrawler = async () => {
    try {
      const { data, error } = await supabase
        .from('crawlers')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setFormData({
        name: data.name,
        url: data.url,
        description: data.description || '',
        status: data.status,
      });
    } catch (error) {
      console.error('Error fetching crawler:', error);
      toast({
        title: "Error",
        description: "Failed to fetch crawler details",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.url.trim()) {
      toast({
        title: "Validation Error",
        description: "Name and URL are required",
        variant: "destructive",
      });
      return;
    }

    // Basic URL validation
    try {
      new URL(formData.url);
    } catch {
      toast({
        title: "Validation Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      if (isEditing) {
        const { error } = await supabase
          .from('crawlers')
          .update({
            name: formData.name.trim(),
            url: formData.url.trim(),
            description: formData.description.trim() || null,
            status: formData.status,
            updated_at: new Date().toISOString(),
          })
          .eq('id', id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Crawler updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('crawlers')
          .insert({
            name: formData.name.trim(),
            url: formData.url.trim(),
            description: formData.description.trim() || null,
            status: formData.status,
            created_by: user?.id,
          });

        if (error) throw error;

        toast({
          title: "Success",
          description: "Crawler created successfully",
        });
      }

      navigate('/dashboard/crawlers');
    } catch (error) {
      console.error('Error saving crawler:', error);
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? 'update' : 'create'} crawler`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof CrawlerFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/dashboard/crawlers">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Crawlers
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">
              {isEditing ? 'Edit Crawler' : 'Create New Crawler'}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? 'Update your web crawler configuration' : 'Set up a new web crawler to monitor'}
            </p>
          </div>
        </div>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Crawler Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  placeholder="Enter crawler name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="url">URL *</Label>
                <Input
                  id="url"
                  type="url"
                  value={formData.url}
                  onChange={handleInputChange('url')}
                  placeholder="https://example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange('description')}
                  placeholder="Describe what this crawler does..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={handleInputChange('status')}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md"
                >
                  <option value="Todo">Todo</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Ready for QA">Ready for QA</option>
                  <option value="Completed">Completed</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : (isEditing ? 'Update Crawler' : 'Create Crawler')}
                </Button>
                <Link to="/dashboard/crawlers">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};
