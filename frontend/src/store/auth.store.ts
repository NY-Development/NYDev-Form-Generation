import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Organization } from '../types';

interface AuthState {
  organization: Organization | null;
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      organization: null,
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user) => set({ user }),
      login: (token, user) => set({ token, user, isAuthenticated: true }),
      logout: () => set({ token: null, user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      // Only persist token and user
      partialize: (state) => ({ token: state.token, user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
