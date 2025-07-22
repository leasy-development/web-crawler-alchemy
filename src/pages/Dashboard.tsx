
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';

export const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Redirect /dashboard to /dashboard/overview for consistency
    if (location.pathname === '/dashboard') {
      // Don't redirect, just show the overview directly
    }
  }, [location.pathname, navigate]);

  return (
    <DashboardLayout>
      <DashboardOverview />
    </DashboardLayout>
  );
};
