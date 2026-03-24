export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'superadmin' | 'owner' | 'admin';
  organizationId: string;
  isActive: boolean;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  branding?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    fontFamily: string;
    logo: string;
    favicon: string;
  };
}

export interface Form {
  id: string;
  title: string;
  description: string;
  slug: string;
  status: 'draft' | 'published' | 'closed';
  submissionCount: number;
}
