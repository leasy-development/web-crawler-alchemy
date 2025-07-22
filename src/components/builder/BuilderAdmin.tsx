
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, Eye, Settings, Monitor } from 'lucide-react';
import { useBuilderContent } from '@/hooks/useBuilderContent';
import { useBuilderMonitor } from '@/hooks/useBuilderMonitor';
import { builderConfig } from '@/config/builder';

export function BuilderAdmin() {
  const { 
    content, 
    isLoading, 
    refreshContent, 
    previewMode, 
    setPreviewMode 
  } = useBuilderContent();
  
  const { 
    assets, 
    isMonitoring, 
    newContentDetected, 
    startMonitoring, 
    stopMonitoring 
  } = useBuilderMonitor();

  const [componentSettings, setComponentSettings] = useState(builderConfig.components);

  const handleComponentToggle = (componentName: string, enabled: boolean) => {
    setComponentSettings(prev => ({
      ...prev,
      [componentName]: {
        ...prev[componentName],
        enabled
      }
    }));
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Builder.io Admin</h1>
            <p className="text-muted-foreground">Manage your Builder.io integration</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                checked={previewMode}
                onCheckedChange={setPreviewMode}
              />
              <span className="text-sm">Preview Mode</span>
            </div>
            
            <Button
              onClick={refreshContent}
              disabled={isLoading}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh Content
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-fit grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Components</CardTitle>
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Object.values(componentSettings).filter(c => c.enabled).length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    of {Object.keys(componentSettings).length} total
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Content Status</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {newContentDetected ? (
                      <Badge variant="destructive">New</Badge>
                    ) : (
                      <Badge variant="default">Synced</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {Object.keys(content).length} components loaded
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monitoring</CardTitle>
                  <Monitor className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isMonitoring ? (
                      <Badge variant="default">Active</Badge>
                    ) : (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {assets.length} assets tracked
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest changes from Builder.io</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(content).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <h4 className="font-medium capitalize">{key}</h4>
                        <p className="text-sm text-muted-foreground">
                          {value ? 'Content loaded' : 'Using fallback'}
                        </p>
                      </div>
                      <Badge variant={value ? 'default' : 'secondary'}>
                        {value ? 'Active' : 'Fallback'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="components" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Component Management</CardTitle>
                <CardDescription>Enable or disable Builder.io components</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(componentSettings).map(([key, config]) => (
                  <div key={key} className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <h4 className="font-medium capitalize">{key}</h4>
                      <p className="text-sm text-muted-foreground">{config.path}</p>
                    </div>
                    <Switch
                      checked={config.enabled}
                      onCheckedChange={(enabled) => handleComponentToggle(key, enabled)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Monitoring</CardTitle>
                <CardDescription>Automatically detect new Builder.io exports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Auto-Sync</h4>
                    <p className="text-sm text-muted-foreground">
                      Monitor for new content every 30 seconds
                    </p>
                  </div>
                  <Button
                    onClick={isMonitoring ? stopMonitoring : startMonitoring}
                    variant={isMonitoring ? 'destructive' : 'default'}
                  >
                    {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
                  </Button>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Tracked Assets</h4>
                  <div className="grid gap-2">
                    {assets.map((asset, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded border">
                        <span className="text-sm">{asset.path}</span>
                        <Badge variant="outline">{asset.type}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>Track Builder.io content performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Monitor className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Analytics integration coming soon</p>
                  <p className="text-sm">Track load times, user engagement, and more</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
