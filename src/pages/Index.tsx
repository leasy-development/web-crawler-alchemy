
import { Navigation } from "@/components/Navigation";
import { BuilderLandingPage } from "@/components/builder/pages/BuilderLandingPage";
import { Footer } from "@/components/Footer";
import { useBuilderContent } from "@/hooks/useBuilderContent";

const Index = () => {
  const { content, isLoading } = useBuilderContent();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <BuilderLandingPage
          heroContent={content.hero}
          featuresContent={content.features}
          pricingContent={content.pricing}
        />
      )}
      <Footer />
    </div>
  );
};

export default Index;
