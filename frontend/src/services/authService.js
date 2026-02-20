import useAuthStore from "../store/authStore";

export const loginWithGoogle = async () => {
  // Redirect to backend Google OAuth endpoint
  window.location.href = "/api/auth/google";
};

export const handleGoogleCallback = async () => {
  // Called after redirect from Google
  const res = await fetch("/api/auth/google/callback", {
    credentials: "include"
  });
  const data = await res.json();
  const { user, token } = data;
  useAuthStore.getState().setUser(user, token);
  return { user, token };
};

export const logout = async () => {
  useAuthStore.getState().logout();
  return { success: true };
};
