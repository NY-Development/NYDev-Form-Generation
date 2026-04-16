import api from './api';
import type { ApiResponse, OrgAnalytics, FormAnalytics } from '../types';

export const analyticsService = {
  getOrgAnalytics: (orgId: string) =>
    api.get(`/organizations/${orgId}/analytics`) as Promise<ApiResponse<{ analytics: OrgAnalytics }>>,

  getFormAnalytics: (orgId: string, formId: string) =>
    api.get(`/organizations/${orgId}/forms/${formId}/analytics`) as Promise<ApiResponse<{ analytics: FormAnalytics }>>,
};
