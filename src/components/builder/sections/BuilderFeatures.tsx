
import React from 'react';
import { BuilderWrapper } from '../BuilderWrapper';
import { Features } from '@/components/Features';

interface BuilderFeaturesProps {
  htmlContent?: string;
  fallbackToDefault?: boolean;
}

export function BuilderFeatures({ htmlContent, fallbackToDefault = true }: BuilderFeaturesProps) {
  if (htmlContent) {
    return (
      <BuilderWrapper
        htmlContent={htmlContent}
        componentName="features"
        className="builder-features"
      />
    );
  }

  if (fallbackToDefault) {
    return <Features />;
  }

  return null;
}
