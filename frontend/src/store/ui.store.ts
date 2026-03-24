import { create } from 'zustand';

interface UiState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  loading: boolean;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleSidebar: () => void;
  setLoading: (loading: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  theme: 'light',
  sidebarOpen: true,
  loading: false,
  setTheme: (theme) => set({ theme }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setLoading: (loading) => set({ loading }),
}));
