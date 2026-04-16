import api from './api';
import type { ApiResponse } from '../types';

export interface VerifyResponse {
  verified: boolean;
  alreadyVerified: boolean;
  submission: {
    id: string;
    uniqueId: string;
    submitterName: string;
    submitterEmail: string;
    status: string;
    verifiedAt: string | null;
    form: { title: string; slug: string } | string;
    organization: { name: string; logo: string } | string;
  };
}

export interface SubmissionDetailsResponse {
  submission: {
    id: string;
    uniqueId: string;
    submitterName: string;
    status: string;
    verifiedAt: string | null;
    createdAt: string;
    form: { title: string; slug: string } | string;
    organization: { name: string; logo: string } | string;
  };
}

export const verifyService = {
  verifySubmission: (uniqueId: string) =>
    api.get(`/verify/${uniqueId}`) as Promise<ApiResponse<VerifyResponse>>,

  getSubmissionDetails: (uniqueId: string) =>
    api.get(`/verify/${uniqueId}/details`) as Promise<ApiResponse<SubmissionDetailsResponse>>,
};
