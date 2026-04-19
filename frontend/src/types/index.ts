// ─── API Response Types ─────────────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T[];
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

// ─── User ───────────────────────────────────────────────────
export interface User {
  id: string;
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'superadmin' | 'owner' | 'admin';
  organizationId: string | Organization;
  isActive: boolean;
  avatar?: string;
  lastLogin?: string;
  fullName?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ─── Organization ───────────────────────────────────────────
export interface Organization {
  id: string;
  _id?: string;
  name: string;
  slug: string;
  description?: string;
  owner?: User | string;
  logo?: string;
  branding?: OrgBranding;
  settings?: OrgSettings;
  subscription?: Subscription | string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface OrgBranding {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logo: string;
  favicon: string;
  fontFamily: string;
  socialLinks?: {
    youtube?: string;
    tiktok?: string;
    instagram?: string;
  };
}

export interface OrgSettings {
  defaultFormApproval: boolean;
  notificationsEnabled: boolean;
  publicProfile: boolean;
}

// ─── Form ───────────────────────────────────────────────────
export interface Form {
  id: string;
  _id?: string;
  title: string;
  slug: string;
  link: string;
  description: string;
  organizationId: string | Organization;
  createdBy: string | User;
  fields: FormField[];
  settings: FormSettings;
  branding: FormBranding;
  template: FormTemplate;
  uniqueIdConfig: UniqueIdConfig;
  status: 'draft' | 'published' | 'closed';
  submissionCount: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface FormField {
  fieldId: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required: boolean;
  options?: FieldOption[];
  validation?: FieldValidation;
  order: number;
}

export type FieldType =
  | 'text'
  | 'email'
  | 'phone'
  | 'number'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'time'
  | 'file'
  | 'url'
  | 'address'
  | 'video'
  | 'page_break';

export interface FieldOption {
  label: string;
  value: string;
}

export interface FieldValidation {
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  customError?: string;
}

export interface FormSettings {
  isPublic: boolean;
  acceptingResponses: boolean;
  maxResponses: number;
  confirmationMessage: string;
  requireApproval: boolean;
  notifyOnSubmission: boolean;
  allowEditing: boolean;
  oneResponsePerEmail: boolean;
}

export interface FormBranding {
  headerImage: string;
  primaryColor: string;
  backgroundColor: string;
  fontFamily: string;
  showOrgLogo: boolean;
  customCSS: string;
  socialLinks?: {
    youtube?: string;
    tiktok?: string;
    instagram?: string;
  };
}

export interface FormTemplate {
  isTemplate: boolean;
  category: string;
  templateName: string;
  templateDescription: string;
}

export interface UniqueIdConfig {
  prefix: string;
  useSequential: boolean;
}

// ─── Submission ─────────────────────────────────────────────
export interface Submission {
  id: string;
  _id?: string;
  formId: string | Form;
  organizationId: string | Organization;
  responses: Record<string, unknown>;
  uniqueId: string;
  qrCode: string;
  status: 'pending' | 'approved' | 'rejected' | 'verified';
  submitterEmail: string;
  submitterName: string;
  verifiedAt?: string;
  verifiedBy?: string | User;
  metadata?: SubmissionMetadata;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SubmissionMetadata {
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
}

// ─── Subscription ───────────────────────────────────────────
export interface Subscription {
  id: string;
  _id?: string;
  organizationId: string;
  plan: 'free' | 'pro' | 'enterprise';
  limits: SubscriptionLimits;
  status: 'active' | 'cancelled' | 'expired' | 'past_due';
  startDate?: string;
  endDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SubscriptionLimits {
  maxForms: number;
  maxSubmissionsPerForm: number;
  maxAdmins: number;
  customBranding: boolean;
  analytics: boolean;
  exports: boolean;
  apiAccess: boolean;
  removeWatermark: boolean;
}

// ─── Analytics ──────────────────────────────────────────────
export interface OrgAnalytics {
  overview: {
    totalForms: number;
    publishedForms: number;
    draftForms: number;
    totalSubmissions: number;
  };
  statusBreakdown: StatusBreakdown;
  recentSubmissions: Submission[];
  submissionsOverTime: { _id: string; count: number }[];
}

export interface FormAnalytics {
  form: {
    title: string;
    totalSubmissions: number;
    status: string;
    createdAt: string;
  };
  statusBreakdown: StatusBreakdown;
  submissionsOverTime: { _id: string; count: number }[];
}

export interface StatusBreakdown {
  pending: number;
  approved: number;
  rejected: number;
  verified: number;
}

// ─── Platform Stats (SuperAdmin + Landing) ──────────────────
export interface PlatformStats {
  totalOrganizations: number;
  totalUsers: number;
  totalForms: number;
  totalSubmissions: number;
  planBreakdown?: {
    free: number;
    pro: number;
    enterprise: number;
  };
}

export interface PublicStats {
  totalOrganizations: number;
  totalForms: number;
  totalSubmissions: number;
  totalUsers: number;
}
