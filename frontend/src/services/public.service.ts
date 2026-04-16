import api from './api';
import type { ApiResponse, Form } from '../types';

export interface PublicFormResponse {
  form: {
    id: string;
    title: string;
    description: string;
    fields: Form['fields'];
    settings: {
      confirmationMessage: string;
      requireApproval: boolean;
    };
    branding: Form['branding'];
    organization: {
      name: string;
      logo: string;
      branding: Form['branding'];
    };
  };
}

export interface SubmitFormPayload {
  responses: Record<string, unknown>;
  submitterEmail?: string;
  submitterName?: string;
}

export interface SubmitFormResponse {
  submission: {
    id: string;
    uniqueId: string;
    qrCode: string;
    status: string;
    confirmationMessage: string;
  };
}

export const publicService = {
  getPublicForm: (slug: string) =>
    api.get(`/f/${slug}`) as Promise<ApiResponse<PublicFormResponse>>,

  submitPublicForm: (slug: string, data: SubmitFormPayload) =>
    api.post(`/f/${slug}/submit`, data) as Promise<ApiResponse<SubmitFormResponse>>,

  getPublicStats: () =>
    api.get('/public/stats') as Promise<ApiResponse<{ stats: { totalOrganizations: number; totalForms: number; totalSubmissions: number; totalUsers: number } }>>,
};
