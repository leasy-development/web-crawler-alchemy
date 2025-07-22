
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Monitor, Smartphone, Tablet, BarChart3, Shield, Zap } from 'lucide-react';

export function ProductShowcase() {
  return (
    <section id="demo" className="py-24 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-sm">
            Product Showcase
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            See Your Data Come to Life
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the most intuitive web scraping dashboard ever built. 
            Monitor, manage, and scale your crawlers with unprecedented ease.
          </p>
        </div>

        {/* Main dashboard mockup */}
        <div className="relative mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl"></div>
          <Card className="relative overflow-hidden border-0 shadow-2xl bg-card/50 backdrop-blur-sm">
            <CardContent className="p-0">
              {/* Browser header mockup */}
              <div className="flex items-center gap-2 px-6 py-4 border-b border-border/50 bg-muted/30">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-6 bg-muted rounded px-3 flex items-center text-xs text-muted-foreground">
                    https://yourapp.com/dashboard
                  </div>
                </div>
              </div>

              {/* Dashboard content mockup */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                  {/* Stats cards */}
                  {[
                    { label: 'Active Crawlers', value: '24', change: '+12%', icon: Zap },
                    { label: 'Success Rate', value: '99.2%', change: '+0.3%', icon: Shield },
                    { label: 'Data Points', value: '1.2M', change: '+15%', icon: BarChart3 },
                    { label: 'Uptime', value: '99.9%', change: '0%', icon: Monitor }
                  ].map((stat, index) => (
                    <Card key={index} className="bg-card/50 border-border/50">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <stat.icon className="w-5 h-5 text-primary" />
                          <Badge variant="secondary" className="text-xs">
                            {stat.change}
                          </Badge>
                        </div>
                        <div className="text-2xl font-bold mb-1">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Table mockup */}
                <Card className="bg-card/30 border-border/50">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Recent Crawlers</h3>
                        <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                          Live Updates
                        </Badge>
                      </div>
                      
                      {/* Table rows mockup */}
                      {[
                        { name: 'E-commerce Product Data', status: 'Completed', progress: 100 },
                        { name: 'News Article Scraper', status: 'In Progress', progress: 65 },
                        { name: 'Social Media Monitor', status: 'Ready for QA', progress: 90 },
                        { name: 'Price Tracking Bot', status: 'Todo', progress: 0 }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-3 px-4 rounded-lg bg-muted/30">
                          <div className="flex-1">
                            <div className="font-medium mb-1">{item.name}</div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all duration-500"
                                style={{ width: `${item.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          <Badge 
                            variant={item.status === 'Completed' ? 'default' : 'secondary'}
                            className="ml-4"
                          >
                            {item.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Multi-device showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { device: 'Desktop', icon: Monitor, description: 'Full-featured dashboard' },
            { device: 'Tablet', icon: Tablet, description: 'Touch-optimized interface' },
            { device: 'Mobile', icon: Smartphone, description: 'On-the-go monitoring' }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.device}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
