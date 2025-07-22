import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Globe, Brain } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 animated-bg opacity-90" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/40 via-background/20 to-transparent" />
      
      {/* Hero content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
            <Zap className="w-4 h-4 text-accent" />
            <span>AI-Powered Web Scraping Platform</span>
          </div>
          
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            <span className="text-gradient">
              Extract Data
            </span>
            <br />
            <span className="text-foreground">
              At Lightning Speed
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up [animation-delay:200ms]">
            Transform any website into structured data with our intelligent scraping platform. 
            No coding required, infinite possibilities.
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up [animation-delay:400ms]">
            <Button variant="gradient" size="xl" className="group">
              Start Scraping Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="glass" size="xl">
              Watch Demo
            </Button>
          </div>
          
          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up [animation-delay:600ms]">
            <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
              <Brain className="w-4 h-4 text-accent" />
              <span className="text-sm">AI-Powered</span>
            </div>
            <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
              <Globe className="w-4 h-4 text-secondary" />
              <span className="text-sm">Any Website</span>
            </div>
            <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm">Real-time</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hero image */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-20 animate-float">
        <img 
          src={heroImage} 
          alt="AI Scraper Hero" 
          className="w-full h-full object-cover rounded-tl-3xl"
        />
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-accent rounded-full animate-pulse" />
      <div className="absolute top-40 right-20 w-3 h-3 bg-secondary rounded-full animate-pulse [animation-delay:1s]" />
      <div className="absolute bottom-40 left-20 w-1 h-1 bg-primary rounded-full animate-pulse [animation-delay:2s]" />
    </section>
  );
};