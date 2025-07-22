
import { useState, useEffect, useCallback } from 'react';
import { useBuilderMonitor } from './useBuilderMonitor';

interface BuilderContent {
  hero?: string;
  features?: string;
  pricing?: string;
  navigation?: string;
  footer?: string;
  [key: string]: string | undefined;
}

interface UseBuilderContentReturn {
  content: BuilderContent;
  isLoading: boolean;
  error: string | null;
  loadContent: (componentName: keyof BuilderContent, filePath: string) => Promise<void>;
  refreshContent: () => Promise<void>;
  previewMode: boolean;
  setPreviewMode: (enabled: boolean) => void;
}

export function useBuilderContent(): UseBuilderContentReturn {
  const [content, setContent] = useState<BuilderContent>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const { newContentDetected, clearNewContentFlag } = useBuilderMonitor();

  const loadContent = useCallback(async (componentName: keyof BuilderContent, filePath: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const cacheBuster = previewMode ? `?t=${Date.now()}` : '';
      const response = await fetch(`/builder/${filePath}${cacheBuster}`);
      
      if (!response.ok) {
        throw new Error(`Failed to load ${componentName} content`);
      }

      const htmlContent = await response.text();
      
      // Process the HTML content to inject dynamic data bindings
      const processedContent = await processBuilderContent(htmlContent, componentName);
      
      setContent(prev => ({
        ...prev,
        [componentName]: processedContent
      }));

      // Cache the content for performance
      if (!previewMode) {
        localStorage.setItem(`builder-${componentName}`, processedContent);
        localStorage.setItem(`builder-${componentName}-timestamp`, Date.now().toString());
      }
    } catch (err) {
      console.warn(`Builder.io content not found for ${componentName}, using fallback`);
      setError(err instanceof Error ? err.message : 'Unknown error');
      
      // Try to load from cache if available
      const cachedContent = localStorage.getItem(`builder-${componentName}`);
      if (cachedContent) {
        setContent(prev => ({
          ...prev,
          [componentName]: cachedContent
        }));
      }
    } finally {
      setIsLoading(false);
    }
  }, [previewMode]);

  const processBuilderContent = async (htmlContent: string, componentName: string): Promise<string> => {
    let processedContent = htmlContent;
    
    // Inject theme variables
    processedContent = processedContent.replace(
      /<style>/g,
      `<style>
        :root {
          --primary: hsl(var(--primary));
          --secondary: hsl(var(--secondary));
          --accent: hsl(var(--accent));
          --background: hsl(var(--background));
          --foreground: hsl(var(--foreground));
        }
      `
    );

    // Add responsive classes
    processedContent = processedContent.replace(/class="/g, 'class="responsive-builder ');
    
    return processedContent;
  };

  const loadAllContent = useCallback(async () => {
    const contentMap = {
      hero: 'sections/hero-section.html',
      features: 'sections/features-grid.html',
      pricing: 'sections/pricing-table.html',
      navigation: 'components/navigation.html',
      footer: 'components/footer.html',
    };

    setIsLoading(true);
    
    await Promise.allSettled(
      Object.entries(contentMap).map(([key, path]) => 
        loadContent(key as keyof BuilderContent, path)
      )
    );
    
    setIsLoading(false);
  }, [loadContent]);

  const refreshContent = useCallback(async () => {
    // Clear cache
    Object.keys(content).forEach(key => {
      localStorage.removeItem(`builder-${key}`);
      localStorage.removeItem(`builder-${key}-timestamp`);
    });
    
    setContent({});
    await loadAllContent();
    clearNewContentFlag();
  }, [content, loadAllContent, clearNewContentFlag]);

  useEffect(() => {
    loadAllContent();
  }, []);

  // Auto-refresh when new content is detected
  useEffect(() => {
    if (newContentDetected && !previewMode) {
      refreshContent();
    }
  }, [newContentDetected, previewMode, refreshContent]);

  return {
    content,
    isLoading,
    error,
    loadContent,
    refreshContent,
    previewMode,
    setPreviewMode,
  };
}
