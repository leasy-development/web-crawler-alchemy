import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
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
  const [formData, setFormData] = useState<CrawlerFormData>({
    name: '',
    url: '',
    description: '',
    status: 'Todo',
  });

  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing && id) {
      fetchCrawler(id);
    }
  }, [id, isEditing]);

  const fetchCrawler = async (crawlerId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('crawlers')
        .select('*')
        .eq('id', crawlerId)
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
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Name is required",
        variant: "destructive",
      });
      return;
    }

    if (!formData.url.trim()) {
      toast({
        title: "Validation Error",
        description: "URL is required",
        variant: "destructive",
      });
      return;
    }

    if (!validateUrl(formData.url)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      if (isEditing && id) {
        const { error } = await supabase
          .from('crawlers')
          .update({
            name: formData.name.trim(),
            url: formData.url.trim(),
            description: formData.description.trim() || null,
            status: formData.status,
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
            created_by: user!.id,
          });

        if (error) throw error;

        toast({
          title: "Success",
          description: "Crawler created successfully",
        });
      }

      navigate('/dashboard');
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

  const handleInputChange = (field: keyof CrawlerFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <h1 className="text-2xl font-bold">
              {isEditing ? 'Edit Crawler' : 'Create New Crawler'}
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>
              {isEditing ? 'Edit Crawler' : 'Create New Crawler'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
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
                  onChange={(e) => handleInputChange('url', e.target.value)}
                  placeholder="https://example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter description (optional)"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value as any)}
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
                <Link to="/dashboard" className="flex-1">
                  <Button type="button" variant="outline" className="w-full">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  {isEditing ? 'Update' : 'Create'} Crawler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};