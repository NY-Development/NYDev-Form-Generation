import api from './api';
import type { ApiResponse, Organization, User, OrgBranding, Subscription } from '../types';

export const organizationService = {
  getOrganization: (orgId: string) =>
    api.get(`/organizations/${orgId}`) as Promise<ApiResponse<{ organization: Organization }>>,

  updateOrganization: (orgId: string, data: Partial<Pick<Organization, 'name' | 'description' | 'logo' | 'settings'>>) =>
    api.put(`/organizations/${orgId}`, data) as Promise<ApiResponse<{ organization: Organization }>>,

  getMembers: (orgId: string) =>
    api.get(`/organizations/${orgId}/members`) as Promise<ApiResponse<{ members: User[] }>>,

  addAdmin: (orgId: string, data: { firstName: string; lastName: string; email: string; password: string }) =>
    api.post(`/organizations/${orgId}/members`, data) as Promise<ApiResponse<{ admin: User }>>,

  removeAdmin: (orgId: string, adminId: string) =>
    api.delete(`/organizations/${orgId}/members/${adminId}`) as Promise<ApiResponse<{ message: string }>>,

  getBranding: (orgId: string) =>
    api.get(`/organizations/${orgId}/branding`) as Promise<ApiResponse<{ branding: OrgBranding }>>,

  updateBranding: (orgId: string, formData: FormData) =>
    api.put(`/organizations/${orgId}/branding`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }) as Promise<ApiResponse<{ organization: Organization }>>,

  getSubscription: (orgId: string) =>
    api.get(`/organizations/${orgId}/subscription`) as Promise<ApiResponse<{ subscription: Subscription }>>,

  updateSubscription: (orgId: string, plan: string) =>
    api.put(`/organizations/${orgId}/subscription`, { plan }) as Promise<ApiResponse<{ subscription: Subscription }>>,
};
