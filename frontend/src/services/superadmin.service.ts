import api from './api';
import type { ApiResponse, PaginatedResponse, Organization, User, PlatformStats, Subscription } from '../types';

export interface GetOrgsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

export interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
}

export const superadminService = {
  getOrganizations: (params?: GetOrgsParams) =>
    api.get('/superadmin/organizations', { params }) as Promise<PaginatedResponse<Organization>>,

  getUsers: (params?: GetUsersParams) =>
    api.get('/superadmin/users', { params }) as Promise<PaginatedResponse<User>>,

  getStats: () =>
    api.get('/superadmin/stats') as Promise<ApiResponse<{ stats: PlatformStats }>>,

  toggleOrgStatus: (orgId: string) =>
    api.put(`/superadmin/organizations/${orgId}/status`) as Promise<ApiResponse<{ organization: Organization }>>,

  updateOrgSubscription: (orgId: string, plan: string) =>
    api.put(`/superadmin/organizations/${orgId}/subscription`, { plan }) as Promise<ApiResponse<{ subscription: Subscription }>>,
};
