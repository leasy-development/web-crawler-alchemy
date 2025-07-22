
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface BuilderAsset {
  path: string;
  type: 'html' | 'css' | 'js' | 'image';
  lastModified: number;
  size: number;
}

interface UseBuilderMonitorReturn {
  assets: BuilderAsset[];
  isMonitoring: boolean;
  newContentDetected: boolean;
  startMonitoring: () => void;
  stopMonitoring: () => void;
  clearNewContentFlag: () => void;
}

export function useBuilderMonitor(): UseBuilderMonitorReturn {
  const [assets, setAssets] = useState<BuilderAsset[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [newContentDetected, setNewContentDetected] = useState(false);
  const { toast } = useToast();

  const scanBuilderDirectory = useCallback(async () => {
    try {
      const response = await fetch('/api/builder/scan');
      if (response.ok) {
        const newAssets = await response.json();
        
        // Check for new or updated assets
        const hasChanges = JSON.stringify(newAssets) !== JSON.stringify(assets);
        
        if (hasChanges && assets.length > 0) {
          setNewContentDetected(true);
          toast({
            title: "New Builder.io Content Detected",
            description: "Fresh designs have been exported from Builder.io",
          });
        }
        
        setAssets(newAssets);
      }
    } catch (error) {
      console.log('Builder.io monitoring: No new content detected');
    }
  }, [assets, toast]);

  useEffect(() => {
    if (isMonitoring) {
      const interval = setInterval(scanBuilderDirectory, 30000); // Check every 30 seconds
      return () => clearInterval(interval);
    }
  }, [isMonitoring, scanBuilderDirectory]);

  const startMonitoring = useCallback(() => {
    setIsMonitoring(true);
    scanBuilderDirectory();
  }, [scanBuilderDirectory]);

  const stopMonitoring = useCallback(() => {
    setIsMonitoring(false);
  }, []);

  const clearNewContentFlag = useCallback(() => {
    setNewContentDetected(false);
  }, []);

  return {
    assets,
    isMonitoring,
    newContentDetected,
    startMonitoring,
    stopMonitoring,
    clearNewContentFlag,
  };
}
