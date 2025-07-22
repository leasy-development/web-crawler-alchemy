
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Bot, 
  Activity, 
  CheckCircle, 
  Clock, 
  Plus,
  TrendingUp,
  AlertCircle 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface CrawlerStats {
  total: number;
  byStatus: Record<string, number>;
  recentActivity: Array<{
    id: string;
    name: string;
    status: string;
    updated_at: string;
  }>;
}

const statusColors = {
  'Todo': '#6b7280',
  'In Progress': '#3b82f6',
  'Ready for QA': '#f59e0b',
  'Completed': '#10b981',
  'Failed': '#ef4444',
};

const chartConfig = {
  count: {
    label: "Count",
    color: "hsl(var(--chart-1))",
  },
};

export function DashboardOverview() {
  const [stats, setStats] = useState<CrawlerStats>({
    total: 0,
    byStatus: {},
    recentActivity: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data: crawlers, error } = await supabase
        .from('crawlers')
        .select('id, name, status, updated_at')
        .order('updated_at', { ascending: false });

      if (error) throw error;

      const byStatus = crawlers?.reduce((acc, crawler) => {
        acc[crawler.status] = (acc[crawler.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      setStats({
        total: crawlers?.length || 0,
        byStatus,
        recentActivity: crawlers?.slice(0, 5) || [],
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = Object.entries(stats.byStatus).map(([status, count]) => ({
    status,
    count,
    fill: statusColors[status as keyof typeof statusColors] || '#6b7280',
  }));

  const pieData = Object.entries(stats.byStatus).map(([status, count]) => ({
    name: status,
    value: count,
    fill: statusColors[status as keyof typeof statusColors] || '#6b7280',
  }));

  if (loading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-muted-foreground">Monitor your web crawlers and track performance</p>
        </div>
        <Link to="/crawler/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Crawler
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Crawlers</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              {stats.byStatus['In Progress'] || 0} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.byStatus['Completed'] || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats.total > 0 ? Math.round(((stats.byStatus['Completed'] || 0) / stats.total) * 100) : 0}% success rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.byStatus['In Progress'] || 0}</div>
            <p className="text-xs text-muted-foreground">
              Currently running
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.byStatus['Failed'] || 0}</div>
            <p className="text-xs text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="status" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Activity</CardTitle>
          <Link to="/dashboard/crawlers">
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.recentActivity.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Bot className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No crawlers yet. Create your first one to get started!</p>
              </div>
            ) : (
              stats.recentActivity.map((crawler) => (
                <div key={crawler.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Bot className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{crawler.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Updated {new Date(crawler.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge
                    style={{
                      backgroundColor: statusColors[crawler.status as keyof typeof statusColors],
                      color: 'white',
                    }}
                  >
                    {crawler.status}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
