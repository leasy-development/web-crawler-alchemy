
import { useState, useEffect } from 'react';

interface BuilderContent {
  hero?: string;
  features?: string;
  pricing?: string;
  navigation?: string;
}

interface UseBuilderContentReturn {
  content: BuilderContent;
  isLoading: boolean;
  error: string | null;
  loadContent: (componentName: keyof BuilderContent, filePath: string) => Promise<void>;
}

export function useBuilderContent(): UseBuilderContentReturn {
  const [content, setContent] = useState<BuilderContent>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadContent = async (componentName: keyof BuilderContent, filePath: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real implementation, this would fetch from your Builder.io export folder
      // For now, we'll simulate loading content
      const response = await fetch(`/builder/${filePath}`);
      
      if (!response.ok) {
        throw new Error(`Failed to load ${componentName} content`);
      }

      const htmlContent = await response.text();
      
      setContent(prev => ({
        ...prev,
        [componentName]: htmlContent
      }));
    } catch (err) {
      console.warn(`Builder.io content not found for ${componentName}, using fallback`);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  const loadAllContent = async () => {
    const contentMap = {
      hero: 'sections/hero-section.html',
      features: 'sections/features-grid.html',
      pricing: 'sections/pricing-table.html',
    };

    await Promise.allSettled(
      Object.entries(contentMap).map(([key, path]) => 
        loadContent(key as keyof BuilderContent, path)
      )
    );
  };

  useEffect(() => {
    loadAllContent();
  }, []);

  return {
    content,
    isLoading,
    error,
    loadContent,
  };
}
