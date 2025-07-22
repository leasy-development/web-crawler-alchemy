
interface BuilderConfig {
  enabled: boolean;
  contentPath: string;
  fallbackToDefault: boolean;
  autoSync: boolean;
  monitoringInterval: number;
  cacheEnabled: boolean;
  cacheTTL: number;
  analyticsEnabled: boolean;
  previewMode: boolean;
  components: {
    [key: string]: {
      path: string;
      enabled: boolean;
      priority: number;
      fallbackComponent?: string;
    };
  };
}

export const builderConfig: BuilderConfig = {
  enabled: true,
  contentPath: '/builder',
  fallbackToDefault: true,
  autoSync: true,
  monitoringInterval: 30000, // 30 seconds
  cacheEnabled: true,
  cacheTTL: 300000, // 5 minutes
  analyticsEnabled: true,
  previewMode: false,
  components: {
    hero: {
      path: 'sections/hero-section.html',
      enabled: true,
      priority: 1,
      fallbackComponent: 'Hero',
    },
    features: {
      path: 'sections/features-grid.html',
      enabled: true,
      priority: 2,
      fallbackComponent: 'Features',
    },
    pricing: {
      path: 'sections/pricing-table.html',
      enabled: true,
      priority: 3,
      fallbackComponent: 'Pricing',
    },
    navigation: {
      path: 'components/navigation.html',
      enabled: false,
      priority: 0,
      fallbackComponent: 'Navigation',
    },
    footer: {
      path: 'components/footer.html',
      enabled: false,
      priority: 10,
      fallbackComponent: 'Footer',
    },
    testimonials: {
      path: 'sections/testimonials.html',
      enabled: true,
      priority: 4,
    },
    cta: {
      path: 'sections/cta-section.html',
      enabled: true,
      priority: 5,
    },
    blog: {
      path: 'sections/blog-preview.html',
      enabled: true,
      priority: 6,
    },
  },
};

export function getBuilderComponentPath(componentName: string): string {
  const component = builderConfig.components[componentName];
  if (!component || !component.enabled) {
    throw new Error(`Builder component ${componentName} not found or disabled`);
  }
  return `${builderConfig.contentPath}/${component.path}`;
}

export function isBuilderEnabled(): boolean {
  return builderConfig.enabled;
}

export function getBuilderComponent(componentName: string) {
  return builderConfig.components[componentName];
}

export function updateBuilderConfig(updates: Partial<BuilderConfig>) {
  Object.assign(builderConfig, updates);
  
  // Persist to localStorage for user preferences
  localStorage.setItem('builder-config', JSON.stringify(builderConfig));
}

export function loadBuilderConfig() {
  const saved = localStorage.getItem('builder-config');
  if (saved) {
    try {
      const savedConfig = JSON.parse(saved);
      Object.assign(builderConfig, savedConfig);
    } catch (error) {
      console.warn('Failed to load saved Builder.io config:', error);
    }
  }
}

// Initialize config from localStorage on import
loadBuilderConfig();
