
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface BuilderWrapperProps {
  htmlContent: string;
  componentName: string;
  className?: string;
  data?: Record<string, any>;
  onMount?: () => void;
}

export function BuilderWrapper({ 
  htmlContent, 
  componentName, 
  className,
  data,
  onMount 
}: BuilderWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && htmlContent) {
      // Clean and inject HTML content
      containerRef.current.innerHTML = htmlContent;
      
      // Execute any scripts in the injected HTML
      const scripts = containerRef.current.querySelectorAll('script');
      scripts.forEach(script => {
        const newScript = document.createElement('script');
        newScript.textContent = script.textContent;
        script.parentNode?.replaceChild(newScript, script);
      });

      // Inject dynamic data if provided
      if (data) {
        Object.keys(data).forEach(key => {
          const elements = containerRef.current?.querySelectorAll(`[data-builder-key="${key}"]`);
          elements?.forEach(element => {
            element.textContent = data[key];
          });
        });
      }

      onMount?.();
    }
  }, [htmlContent, data, onMount]);

  return (
    <div 
      ref={containerRef}
      className={cn("builder-component", className)}
      data-builder-component={componentName}
    />
  );
}
