import api from './api';
import type { ApiResponse, PaginatedResponse, Form } from '../types';

export interface CreateFormPayload {
  title: string;
  description?: string;
  fields?: Form['fields'];
  settings?: Partial<Form['settings']>;
  branding?: Partial<Form['branding']>;
  template?: Partial<Form['template']>;
  uniqueIdConfig?: Partial<Form['uniqueIdConfig']>;
}

export interface GetFormsParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

export const formService = {
  getForms: (orgId: string, params?: GetFormsParams) =>
    api.get(`/organizations/${orgId}/forms`, { params }) as Promise<PaginatedResponse<Form>>,

  getForm: (orgId: string, formId: string) =>
    api.get(`/organizations/${orgId}/forms/${formId}`) as Promise<ApiResponse<{ form: Form }>>,

  createForm: (orgId: string, data: CreateFormPayload) =>
    api.post(`/organizations/${orgId}/forms`, data) as Promise<ApiResponse<{ form: Form }>>,

  updateForm: (orgId: string, formId: string, data: Partial<CreateFormPayload>) =>
    api.put(`/organizations/${orgId}/forms/${formId}`, data) as Promise<ApiResponse<{ form: Form }>>,

  deleteForm: (orgId: string, formId: string) =>
    api.delete(`/organizations/${orgId}/forms/${formId}`) as Promise<ApiResponse<{ message: string }>>,

  publishForm: (orgId: string, formId: string) =>
    api.put(`/organizations/${orgId}/forms/${formId}/publish`) as Promise<ApiResponse<{ form: Form }>>,

  closeForm: (orgId: string, formId: string) =>
    api.put(`/organizations/${orgId}/forms/${formId}/close`) as Promise<ApiResponse<{ form: Form }>>,

  getTemplates: (category?: string) =>
    api.get('/organizations/templates', { params: category ? { category } : {} }) as Promise<ApiResponse<{ templates: Form[] }>>,

  cloneTemplate: (orgId: string, templateId: string) =>
    api.post(`/organizations/${orgId}/forms/from-template/${templateId}`) as Promise<ApiResponse<{ form: Form }>>,
};
