import { Card } from "@/components/ui/card";
import { 
  Brain, 
  Zap, 
  Shield, 
  BarChart3, 
  Globe, 
  Cog,
  Database,
  Bot,
  Clock
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Extraction",
    description: "Advanced machine learning algorithms automatically identify and extract relevant data from any website structure.",
    color: "text-accent"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Process thousands of pages per minute with our optimized scraping infrastructure and parallel processing.",
    color: "text-primary"
  },
  {
    icon: Shield,
    title: "Anti-Detection",
    description: "Smart rotation of IPs, user agents, and request patterns to bypass anti-bot measures seamlessly.",
    color: "text-secondary"
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Monitor scraping performance, success rates, and data quality with comprehensive dashboard insights.",
    color: "text-accent"
  },
  {
    icon: Globe,
    title: "Global Infrastructure",
    description: "Worldwide proxy network ensures reliable access to geo-restricted content and optimal performance.",
    color: "text-primary"
  },
  {
    icon: Cog,
    title: "Custom Workflows",
    description: "Create complex scraping workflows with conditional logic, data transformation, and automated scheduling.",
    color: "text-secondary"
  },
  {
    icon: Database,
    title: "Multiple Formats",
    description: "Export data in JSON, CSV, XML, or directly to your database, CRM, or favorite business tools.",
    color: "text-accent"
  },
  {
    icon: Bot,
    title: "Smart Automation",
    description: "Set up automated scraping schedules, alerts, and data validation rules for hands-off operation.",
    color: "text-primary"
  },
  {
    icon: Clock,
    title: "24/7 Monitoring",
    description: "Continuous monitoring ensures your scrapers stay healthy with automatic error detection and recovery.",
    color: "text-secondary"
  }
];

export const Features = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Powerful Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to extract, process, and analyze web data at enterprise scale
          </p>
        </div>
        
        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="glass p-6 hover:scale-105 transition-all duration-300 border-0 group"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-gradient-primary/10 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary rounded-full blur-3xl" />
      </div>
    </section>
  );
};