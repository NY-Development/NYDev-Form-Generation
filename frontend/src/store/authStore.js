import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  setUser: (user, token) => {
    // Supabase user object: { id, email, ... }
    // Optionally add role or name if available
    const parsedUser = {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.name || user.email,
      role: user.user_metadata?.role || "user"
    };
    set({ user: parsedUser, token });
  },
  logout: () => set({ user: null, token: null })
}));

export default useAuthStore;
