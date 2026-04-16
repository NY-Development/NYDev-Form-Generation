import api from './api';
import type { ApiResponse, User } from '../types';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  organizationName?: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  organization?: { id: string; name: string; slug: string };
}

export interface RegisterResponse {
  user: User;
  organization: { id: string; name: string; slug: string };
  token: string;
}

export const authService = {
  login: (data: LoginPayload) =>
    api.post('/auth/login', data) as Promise<ApiResponse<LoginResponse>>,

  register: (data: RegisterPayload) =>
    api.post('/auth/register', data) as Promise<ApiResponse<RegisterResponse>>,

  getMe: () =>
    api.get('/auth/me') as Promise<ApiResponse<{ user: User }>>,

  updatePassword: (data: { currentPassword: string; newPassword: string }) =>
    api.put('/auth/password', data) as Promise<ApiResponse<{ token: string }>>,

  updateProfile: (data: Partial<Pick<User, 'firstName' | 'lastName' | 'avatar'>>) =>
    api.put('/auth/profile', data) as Promise<ApiResponse<{ user: User }>>,

  logout: () =>
    api.post('/auth/logout') as Promise<ApiResponse<null>>,
};
