
import { BuilderPreview } from '@/components/builder/BuilderPreview';
import { ProtectedRoute } from '@/components/ProtectedRoute';

const BuilderPreviewPage = () => {
  return (
    <ProtectedRoute>
      <BuilderPreview />
    </ProtectedRoute>
  );
};

export default BuilderPreviewPage;
