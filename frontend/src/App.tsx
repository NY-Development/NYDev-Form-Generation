import { useEffect } from 'react';
import { AppRouter } from '@/router';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useUiStore } from '@/store/ui.store';
import { useAuthStore } from '@/store/auth.store';
import { authService } from '@/services/auth.service';
import { organizationService } from '@/services/organization.service';
import { Toaster } from '@/components/ui/sonner';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

function App() {
  const theme = useUiStore((state) => state.theme);
  const { token, setUser, setOrganization, logout, setLoading } = useAuthStore();

  // Apply theme class
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  // Validate session on mount
  useEffect(() => {
    const validateSession = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await authService.getMe();
        const user = res.data.user;
        setUser(user);

        const orgId =
          typeof user.organizationId === 'string'
            ? user.organizationId
            : (user.organizationId as any)?.id || (user.organizationId as any)?._id;

        if (orgId) {
          try {
            const orgRes = await organizationService.getOrganization(orgId);
            setOrganization(orgRes.data.organization);
          } catch {
            // superadmin may not have org
          }
        }
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };

    validateSession();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ErrorBoundary>
      <TooltipProvider>
        <AppRouter />
        <Toaster richColors position="top-right" closeButton />
      </TooltipProvider>
    </ErrorBoundary>
  );
}

export default App;
