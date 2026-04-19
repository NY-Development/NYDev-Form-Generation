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

export interface GetAuditLogsParams {
  page?: number;
  limit?: number;
  action?: string;
  severity?: string;
  search?: string;
}

export interface GetTicketsParams {
  page?: number;
  limit?: number;
  status?: string;
  priority?: string;
  search?: string;
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

  getAuditLogs: (params?: GetAuditLogsParams) =>
    api.get('/superadmin/audit-logs', { params }) as Promise<any>,

  getSupportTickets: (params?: GetTicketsParams) =>
    api.get('/superadmin/support-tickets', { params }) as Promise<any>,

  createSupportTicket: (data: { title: string; description: string; priority?: string; organizationName?: string }) =>
    api.post('/superadmin/support-tickets', data) as Promise<any>,

  updateSupportTicket: (id: string, data: any) =>
    api.put(`/superadmin/support-tickets/${id}`, data) as Promise<any>,
};

