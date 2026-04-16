import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Organization } from '../types';

interface AuthState {
  user: User | null;
  organization: Organization | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setOrganization: (organization: Organization | null) => void;
  login: (token: string, user: User, organization?: Organization | null) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      organization: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,
      setUser: (user) => set({ user }),
      setOrganization: (organization) => set({ organization }),
      login: (token, user, organization = null) =>
        set({ token, user, organization, isAuthenticated: true, isLoading: false }),
      logout: () =>
        set({ token: null, user: null, organization: null, isAuthenticated: false, isLoading: false }),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        organization: state.organization,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
