import { ROLE_FORM_ADMIN, ROLE_ORG_ADMIN, ROLE_SUPERADMIN } from "./roleConstants";

const USER_STORAGE_KEY = "nydev_user";
const TOKEN_STORAGE_KEY = "nydev_token";

export const setMockRole = (role = ROLE_ORG_ADMIN) => {
  const mockUser = {
    id: `mock-${role}`,
    name: "Mock User",
    email: `${role}@nydev.com`,
    role
  };

  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser));
  localStorage.setItem(TOKEN_STORAGE_KEY, "mock-token");

  return mockUser;
};

export const roleOptions = [ROLE_ORG_ADMIN, ROLE_FORM_ADMIN, ROLE_SUPERADMIN];
