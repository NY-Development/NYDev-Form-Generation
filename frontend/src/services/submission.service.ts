import api from './api';
import type { ApiResponse, PaginatedResponse, Submission } from '../types';

export interface GetSubmissionsParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

export const submissionService = {
  getSubmissions: (orgId: string, formId: string, params?: GetSubmissionsParams) =>
    api.get(`/organizations/${orgId}/forms/${formId}/submissions`, { params }) as Promise<PaginatedResponse<Submission>>,

  getSubmission: (orgId: string, submissionId: string) =>
    api.get(`/organizations/${orgId}/submissions/${submissionId}`) as Promise<ApiResponse<{ submission: Submission }>>,

  approveSubmission: (orgId: string, submissionId: string) =>
    api.put(`/organizations/${orgId}/submissions/${submissionId}/approve`) as Promise<ApiResponse<{ submission: Submission }>>,

  rejectSubmission: (orgId: string, submissionId: string, notes?: string) =>
    api.put(`/organizations/${orgId}/submissions/${submissionId}/reject`, { notes }) as Promise<ApiResponse<{ submission: Submission }>>,
};
