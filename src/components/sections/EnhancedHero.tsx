
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ArrowRight, Play, Sparkles, Zap, Target } from 'lucide-react';

export function EnhancedHero() {
  const { user } = useAuth();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_70%)]"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-float-slow"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          {/* Premium badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-8 animate-scale-in">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Enterprise-Grade Web Scraping Platform</span>
          </div>

          {/* Main headline with gradient text */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Manage All Your
            </span>
            <span className="block text-gradient bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Web Crawlers
            </span>
            <span className="block text-white">
              in One Smart Dashboard
            </span>
          </h1>

          {/* Enhanced subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Transform your web scraping workflow with intelligent automation, 
            real-time monitoring, and enterprise-scale reliability. 
            <span className="text-blue-400 font-semibold">Trusted by 10,000+ developers</span> worldwide.
          </p>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium">Lightning Fast</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <Target className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium">99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-medium">AI-Powered</span>
            </div>
          </div>

          {/* Enhanced CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button asChild size="lg" className="group px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl shadow-blue-500/25 transform hover:scale-105 transition-all duration-300">
              <Link to={user ? "/dashboard" : "/signup"}>
                <span className="mr-2">{user ? "Go to Dashboard" : "Start Free Trial"}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="group px-8 py-4 text-lg border-2 border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 backdrop-blur-sm"
              onClick={() => scrollToSection('demo')}
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </div>

          {/* Social proof */}
          <div className="mt-16 text-center animate-fade-in-delayed">
            <p className="text-sm text-gray-400 mb-4">Trusted by industry leaders</p>
            <div className="flex justify-center items-center gap-8 opacity-60">
              {['TechCorp', 'DataFlow', 'ScrapeCo', 'WebMine', 'AutoScrape'].map((company, index) => (
                <div key={company} className="text-lg font-semibold text-gray-500 hover:text-gray-300 transition-colors">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
