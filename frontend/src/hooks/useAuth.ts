import { useAuthStore } from '../store/auth.store';
import { authService } from '../services/auth.service';
import { organizationService } from '../services/organization.service';

export const useAuth = () => {
  const store = useAuthStore();

  const fetchProfile = async () => {
    try {
      store.setLoading(true);
      const res = await authService.getMe();
      const user = res.data.user;
      store.setUser(user);

      // Fetch org if user has one
      const orgId = typeof user.organizationId === 'string' ? user.organizationId : (user.organizationId as any)?.id || (user.organizationId as any)?._id;
      if (orgId) {
        try {
          const orgRes = await organizationService.getOrganization(orgId);
          store.setOrganization(orgRes.data.organization);
        } catch {
          // Org fetch may fail for superadmin without org
        }
      }
    } catch {
      store.logout();
    } finally {
      store.setLoading(false);
    }
  };

  return {
    ...store,
    fetchProfile,
  };
};
