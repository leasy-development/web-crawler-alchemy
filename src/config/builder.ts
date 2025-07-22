
interface BuilderConfig {
  enabled: boolean;
  contentPath: string;
  fallbackToDefault: boolean;
  components: {
    [key: string]: {
      path: string;
      enabled: boolean;
    };
  };
}

export const builderConfig: BuilderConfig = {
  enabled: true,
  contentPath: '/builder',
  fallbackToDefault: true,
  components: {
    hero: {
      path: 'sections/hero-section.html',
      enabled: true,
    },
    features: {
      path: 'sections/features-grid.html',
      enabled: true,
    },
    pricing: {
      path: 'sections/pricing-table.html',
      enabled: true,
    },
    navigation: {
      path: 'components/navigation.html',
      enabled: false, // Keep existing navigation for now
    },
    footer: {
      path: 'components/footer.html',
      enabled: false, // Keep existing footer for now
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
