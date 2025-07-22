
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, Smartphone, Tablet, Monitor } from 'lucide-react';
import { BuilderWrapper } from './BuilderWrapper';
import { useBuilderContent } from '@/hooks/useBuilderContent';
import { builderConfig } from '@/config/builder';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

export function BuilderPreview() {
  const { content, previewMode, setPreviewMode } = useBuilderContent();
  const [selectedComponent, setSelectedComponent] = useState<string>('hero');
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  const deviceStyles = {
    mobile: { width: '375px', height: '667px' },
    tablet: { width: '768px', height: '1024px' },
    desktop: { width: '100%', height: '100%' },
  };

  const DeviceIcon = {
    mobile: Smartphone,
    tablet: Tablet,
    desktop: Monitor,
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Builder.io Preview</h1>
            <p className="text-muted-foreground">Test your Builder.io designs before going live</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setPreviewMode(!previewMode)}
              variant={previewMode ? 'default' : 'outline'}
              className="gap-2"
            >
              {previewMode ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              {previewMode ? 'Preview On' : 'Preview Off'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Controls */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Preview Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Component</label>
                <Select value={selectedComponent} onValueChange={setSelectedComponent}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(builderConfig.components)
                      .filter(([_, config]) => config.enabled)
                      .map(([key, config]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            <span className="capitalize">{key}</span>
                            {content[key] && <Badge variant="outline">Loaded</Badge>}
                          </div>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Device</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['mobile', 'tablet', 'desktop'] as DeviceType[]).map((device) => {
                    const Icon = DeviceIcon[device];
                    return (
                      <Button
                        key={device}
                        variant={deviceType === device ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setDeviceType(device)}
                        className="gap-1"
                      >
                        <Icon className="h-3 w-3" />
                        <span className="capitalize">{device}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Component Status</h4>
                <div className="space-y-2">
                  {Object.keys(builderConfig.components).map((key) => (
                    <div key={key} className="flex items-center justify-between text-sm">
                      <span className="capitalize">{key}</span>
                      <Badge variant={content[key] ? 'default' : 'secondary'}>
                        {content[key] ? 'Builder.io' : 'Fallback'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Preview: {selectedComponent}
                <Badge variant="outline">{deviceType}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden bg-background">
                <div 
                  className="transition-all duration-300 mx-auto"
                  style={deviceType !== 'desktop' ? deviceStyles[deviceType] : {}}
                >
                  {content[selectedComponent] ? (
                    <BuilderWrapper
                      htmlContent={content[selectedComponent]}
                      componentName={selectedComponent}
                      className="w-full h-full"
                      enableAnalytics={previewMode}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-64 text-muted-foreground">
                      <div className="text-center">
                        <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No Builder.io content for {selectedComponent}</p>
                        <p className="text-sm">Using fallback component</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
