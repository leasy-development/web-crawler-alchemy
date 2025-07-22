
import React from 'react';
import { BuilderHero } from '../sections/BuilderHero';
import { BuilderFeatures } from '../sections/BuilderFeatures';
import { BuilderPricing } from '../sections/BuilderPricing';

interface BuilderLandingPageProps {
  heroContent?: string;
  featuresContent?: string;
  pricingContent?: string;
}

export function BuilderLandingPage({ 
  heroContent, 
  featuresContent, 
  pricingContent 
}: BuilderLandingPageProps) {
  return (
    <main>
      <BuilderHero htmlContent={heroContent} />
      <div id="features">
        <BuilderFeatures htmlContent={featuresContent} />
      </div>
      <div id="pricing">
        <BuilderPricing htmlContent={pricingContent} />
      </div>
    </main>
  );
}
