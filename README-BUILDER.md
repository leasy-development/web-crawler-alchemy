
# Builder.io Integration Guide

## Overview
This project now supports Builder.io integration while preserving all existing functionality including authentication, dashboard, and Supabase integration.

## Folder Structure
```
├── src/
│   ├── components/builder/        # Builder.io components
│   │   ├── sections/             # Page sections (Hero, Features, etc.)
│   │   ├── blocks/               # Reusable content blocks
│   │   ├── forms/                # Form components
│   │   └── pages/                # Complete page templates
│   ├── styles/builder/           # Builder.io specific styles
│   ├── hooks/useBuilderContent.tsx  # Hook for loading Builder.io content
│   └── config/builder.ts         # Builder.io configuration
└── public/builder/               # Builder.io exported assets
```

## Builder.io Setup Instructions

### 1. Configure Builder.io Project
- **Repository**: Connect to `web-crawler-alchemy`
- **Development Server Port**: `8080`
- **Build Command**: `npm run dev` or `bun dev`
- **Install Command**: `npm install` or `bun install`

### 2. Export Structure
When exporting from Builder.io, organize files as:
```
public/builder/
├── sections/
│   ├── hero-section.html
│   ├── features-grid.html
│   └── pricing-table.html
├── components/
│   ├── navigation.html (optional)
│   └── footer.html (optional)
└── assets/
    ├── images/
    └── icons/
```

### 3. Design Guidelines
- **Colors**: Use existing design tokens (primary blue, secondary purple, accent cyan)
- **Typography**: Use Inter font family
- **Effects**: Leverage glass-morphism, gradients, and animations
- **Responsive**: Mobile-first approach with existing breakpoints

### 4. Dynamic Content
Use `data-builder-key` attributes in your Builder.io designs:
```html
<h1 data-builder-key="page-title">Default Title</h1>
<button data-builder-key="cta-button">Default CTA</button>
```

### 5. Integration Features
- **Fallback System**: Falls back to existing components if Builder.io content unavailable
- **Authentication Integration**: Dynamically shows/hides content based on user state
- **Supabase Integration**: Can inject database content into Builder.io designs
- **Preserved Functionality**: All existing features (auth, dashboard, routing) remain intact

## Usage

### Loading Builder.io Content
```typescript
import { useBuilderContent } from '@/hooks/useBuilderContent';

const { content, isLoading, loadContent } = useBuilderContent();
```

### Custom Components
```typescript
import { BuilderWrapper } from '@/components/builder/BuilderWrapper';

<BuilderWrapper
  htmlContent={yourHtmlContent}
  componentName="hero"
  data={{ title: "Dynamic Title" }}
/>
```

## Development Workflow
1. Design in Builder.io visual editor
2. Export HTML/CSS to project folders
3. Components automatically load with fallbacks
4. Test integration with existing functionality
5. Deploy with preserved authentication and dashboard features
