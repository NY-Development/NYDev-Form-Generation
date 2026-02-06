const USER_STORAGE_KEY = "nydev_user";
const TOKEN_STORAGE_KEY = "nydev_token";

export const getCurrentUser = async () => {
  const storedUser = localStorage.getItem(USER_STORAGE_KEY);
  if (!storedUser) {
    return { user: null };
  }

  try {
    return { user: JSON.parse(storedUser) };
  } catch (error) {
    localStorage.removeItem(USER_STORAGE_KEY);
    return { user: null };
  }
};

export const loginWithGoogle = async () => {
  const mockUser = {
    id: "mock-user-1",
    name: "Admin User",
    email: "admin@nydev.com",
    role: "org_admin"
  };

  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser));
  localStorage.setItem(TOKEN_STORAGE_KEY, "mock-token");

  return { user: mockUser, token: "mock-token" };
};

export const logout = async () => {
  localStorage.removeItem(USER_STORAGE_KEY);
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  return { success: true };
};
