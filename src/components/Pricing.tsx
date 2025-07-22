import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Star, Zap } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "month",
    description: "Perfect for small projects and personal use",
    features: [
      "Up to 10,000 pages/month",
      "5 concurrent scrapers",
      "Basic data export (CSV, JSON)",
      "Email support",
      "Standard proxy rotation"
    ],
    buttonText: "Start Free Trial",
    buttonVariant: "outline" as const,
    popular: false
  },
  {
    name: "Professional",
    price: "$99",
    period: "month",
    description: "Ideal for growing businesses and agencies",
    features: [
      "Up to 100,000 pages/month",
      "25 concurrent scrapers",
      "Advanced data formats",
      "Priority support",
      "Premium proxy network",
      "API access",
      "Custom webhooks",
      "Data validation rules"
    ],
    buttonText: "Start Free Trial",
    buttonVariant: "gradient" as const,
    popular: true
  },
  {
    name: "Enterprise",
    price: "$299",
    period: "month",
    description: "For large-scale operations and teams",
    features: [
      "Unlimited pages",
      "Unlimited concurrent scrapers",
      "White-label solution",
      "Dedicated support manager",
      "Custom infrastructure",
      "SLA guarantee",
      "Advanced analytics",
      "Team collaboration tools",
      "Custom integrations"
    ],
    buttonText: "Contact Sales",
    buttonVariant: "secondary" as const,
    popular: false
  }
];

export const Pricing = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your data extraction needs. All plans include a 14-day free trial.
          </p>
        </div>
        
        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name}
              className={`relative p-8 border-0 hover:scale-105 transition-all duration-300 ${
                plan.popular 
                  ? 'glass ring-2 ring-primary/50 shadow-2xl' 
                  : 'glass'
              }`}
              style={{
                animationDelay: `${index * 200}ms`
              }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Most Popular
                  </div>
                </div>
              )}
              
              {/* Plan header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-primary">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
              </div>
              
              {/* Features list */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              {/* CTA button */}
              <Button 
                variant={plan.buttonVariant} 
                size="lg" 
                className="w-full"
              >
                {plan.popular && <Zap className="w-4 h-4 mr-2" />}
                {plan.buttonText}
              </Button>
            </Card>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            Need a custom solution? We've got you covered.
          </p>
          <Button variant="ghost" size="lg">
            Schedule a Demo →
          </Button>
        </div>
      </div>
    </section>
  );
};