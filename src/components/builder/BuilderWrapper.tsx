import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

interface BuilderWrapperProps {
  htmlContent: string;
  componentName: string;
  className?: string;
  data?: Record<string, any>;
  onMount?: () => void;
  enableAnalytics?: boolean;
}

export function BuilderWrapper({ 
  htmlContent, 
  componentName, 
  className,
  data,
  onMount,
  enableAnalytics = true
}: BuilderWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (containerRef.current && htmlContent) {
      try {
        // Clean and inject HTML content
        containerRef.current.innerHTML = htmlContent;
        
        // Process CSS variables for theme integration
        const styleElements = containerRef.current.querySelectorAll('style');
        styleElements.forEach(style => {
          if (style.textContent) {
            // Replace hardcoded colors with CSS variables
            let updatedCSS = style.textContent
              .replace(/#1e3a8a/g, 'hsl(var(--primary))')
              .replace(/#7c3aed/g, 'hsl(var(--secondary))')
              .replace(/#0891b2/g, 'hsl(var(--accent))')
              .replace(/#ffffff/g, 'hsl(var(--background))')
              .replace(/#000000/g, 'hsl(var(--foreground))');
            
            style.textContent = updatedCSS;
          }
        });
        
        // Execute any scripts in the injected HTML
        const scripts = containerRef.current.querySelectorAll('script');
        scripts.forEach(script => {
          const newScript = document.createElement('script');
          newScript.textContent = script.textContent;
          script.parentNode?.replaceChild(newScript, script);
        });

        // Inject dynamic data and authentication state
        const dynamicData = {
          ...data,
          user: user ? {
            email: user.email,
            isAuthenticated: true,
          } : null,
          timestamp: new Date().toISOString(),
        };

        Object.keys(dynamicData).forEach(key => {
          const elements = containerRef.current?.querySelectorAll(`[data-builder-key="${key}"]`);
          elements?.forEach(element => {
            if (typeof dynamicData[key] === 'string') {
              element.textContent = dynamicData[key];
            } else if (typeof dynamicData[key] === 'object') {
              element.setAttribute('data-dynamic-content', JSON.stringify(dynamicData[key]));
            }
          });
        });

        // Add responsive classes
        const allElements = containerRef.current.querySelectorAll('*');
        allElements.forEach(element => {
          if (element.classList.length === 0) {
            element.classList.add('responsive-builder');
          }
        });

        // Analytics tracking
        if (enableAnalytics) {
          trackBuilderComponent(componentName, 'loaded');
        }

        setIsLoaded(true);
        setError(null);
        onMount?.();
      } catch (err) {
        console.error('Error processing Builder.io content:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    }
  }, [htmlContent, data, onMount, user, componentName, enableAnalytics]);

  const trackBuilderComponent = (component: string, event: string) => {
    // Simple analytics tracking - can be enhanced with actual analytics service
    const analyticsData = {
      component,
      event,
      timestamp: Date.now(),
      user: user?.id ?? 'anonymous',
      url: window.location.href,
    };

    // Store in localStorage for now - replace with actual analytics service
    const existingData = JSON.parse(localStorage.getItem('builder-analytics') || '[]');
    existingData.push(analyticsData);
    
    // Keep only last 100 events
    const trimmedData = existingData.slice(-100);
    localStorage.setItem('builder-analytics', JSON.stringify(trimmedData));

    console.log('Builder.io Analytics:', analyticsData);
  };

  if (error) {
    return (
      <div className={cn("builder-error p-4 rounded-lg border border-destructive/20 bg-destructive/10", className)}>
        <p className="text-destructive text-sm">Error loading Builder.io content: {error}</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={cn(
        "builder-component transition-opacity duration-300",
        isLoaded ? "opacity-100" : "opacity-0",
        className
      )}
      data-builder-component={componentName}
      data-builder-loaded={isLoaded}
    />
  );
}
