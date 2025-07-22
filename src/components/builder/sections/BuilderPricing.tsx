
import React from 'react';
import { BuilderWrapper } from '../BuilderWrapper';
import { Pricing } from '@/components/Pricing';

interface BuilderPricingProps {
  htmlContent?: string;
  fallbackToDefault?: boolean;
}

export function BuilderPricing({ htmlContent, fallbackToDefault = true }: BuilderPricingProps) {
  if (htmlContent) {
    return (
      <BuilderWrapper
        htmlContent={htmlContent}
        componentName="pricing"
        className="builder-pricing"
      />
    );
  }

  if (fallbackToDefault) {
    return <Pricing />;
  }

  return null;
}
