
import { StickyNavigation } from "@/components/sections/StickyNavigation";
import { EnhancedHero } from "@/components/sections/EnhancedHero";
import { Features } from "@/components/Features";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { Pricing } from "@/components/Pricing";
import { EnhancedFooter } from "@/components/sections/EnhancedFooter";

const Index = () => {
  return (
    <div className="min-h-screen">
      <StickyNavigation />
      <EnhancedHero />
      <div id="features">
        <Features />
      </div>
      <ProductShowcase />
      <div id="testimonials">
        <TestimonialsSection />
      </div>
      <div id="pricing">
        <Pricing />
      </div>
      <EnhancedFooter />
    </div>
  );
};

export default Index;
