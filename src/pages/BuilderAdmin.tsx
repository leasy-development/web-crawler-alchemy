
import { BuilderAdmin } from '@/components/builder/BuilderAdmin';
import { ProtectedRoute } from '@/components/ProtectedRoute';

const BuilderAdminPage = () => {
  return (
    <ProtectedRoute>
      <BuilderAdmin />
    </ProtectedRoute>
  );
};

export default BuilderAdminPage;
