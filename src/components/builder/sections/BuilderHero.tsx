
import React from 'react';
import { BuilderWrapper } from '../BuilderWrapper';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface BuilderHeroProps {
  htmlContent?: string;
  fallbackToDefault?: boolean;
}

export function BuilderHero({ htmlContent, fallbackToDefault = true }: BuilderHeroProps) {
  const { user } = useAuth();

  // Default hero content if no Builder.io content provided
  const defaultHeroContent = `
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 animated-bg opacity-20"></div>
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="animate-fade-in">
          <h1 class="text-5xl md:text-7xl font-bold mb-6 text-gradient">
            AI-Powered Web Scraping
          </h1>
          <p class="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Transform any website into structured data with intelligent extraction. 
            No coding required, enterprise-grade reliability.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <div data-builder-key="cta-primary"></div>
            <div data-builder-key="cta-secondary"></div>
          </div>
        </div>
      </div>
    </section>
  `;

  const dynamicData = {
    'cta-primary': user ? 'Go to Dashboard' : 'Get Started Free',
    'cta-secondary': 'View Documentation',
  };

  if (htmlContent) {
    return (
      <BuilderWrapper
        htmlContent={htmlContent}
        componentName="hero"
        data={dynamicData}
        className="builder-hero"
      />
    );
  }

  if (fallbackToDefault) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 animated-bg opacity-20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient">
              AI-Powered Web Scraping
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Transform any website into structured data with intelligent extraction. 
              No coding required, enterprise-grade reliability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-gradient text-lg px-8 py-4">
                <Link to={user ? "/dashboard" : "/signup"}>
                  {user ? "Go to Dashboard" : "Get Started Free"}
                </Link>
              </Button>
              <Button asChild variant="outline" className="text-lg px-8 py-4 hover-glow">
                <Link to="#features">View Documentation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return null;
}
