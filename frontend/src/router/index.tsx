import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute, PublicRoute, SuperAdminRoute } from './ProtectedRoutes';

// Layouts
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { SuperAdminLayout } from '../components/layout/SuperAdminLayout';

// Pages — Auth
import Login from '../pages/auth/Login';

// Pages — Public
import Landing from '../pages/public/Landing';
import { FormView } from '../pages/public/FormView';
import { RegistrationSuccess } from '../pages/public/RegistrationSuccess';
import { VerifyPage } from '../pages/public/VerifyPage';

// Pages — Dashboard
import DashboardOverview from '../pages/dashboard/Overview';
import FormsList from '../pages/dashboard/forms/FormsList';
import Templates from '../pages/dashboard/forms/Templates';
import CreateWizard from '../pages/dashboard/forms/CreateWizard';
import FormSubmissions from '../pages/dashboard/forms/AdminList';
import SubmissionDetail from '../pages/dashboard/forms/SubmissionDetail';
import SettingsPage from '../pages/dashboard/SettingsPage';
import BillingPage from '../pages/dashboard/BillingPage';

// Pages — SuperAdmin
import SuperAdminOverview from '../pages/superadmin/Overview';
import SuperAdminOrgs from '../pages/superadmin/Organizations';
import SuperAdminUsers from '../pages/superadmin/Users';
import AuditLogs from '../pages/superadmin/AuditLogs';
import AdminSettings from '../pages/superadmin/AdminSettings';
import SupportHub from '../pages/superadmin/SupportHub';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ─── Public Routes ──────────────────────────────── */}
        <Route path="/" element={<Landing />} />
        <Route path="/f/:slug" element={<FormView />} />
        <Route path="/f/:slug/success" element={<RegistrationSuccess />} />
        <Route path="/verify/:id" element={<VerifyPage />} />

        {/* ─── Auth Routes (redirect if logged in) ───────── */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* ─── Dashboard Routes (protected) ──────────────── */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout title="Dashboard"><DashboardOverview /></DashboardLayout>} />
          <Route path="/dashboard/forms" element={<DashboardLayout title="My Forms"><FormsList /></DashboardLayout>} />
          <Route path="/dashboard/forms/templates" element={<DashboardLayout title="Template Library"><Templates /></DashboardLayout>} />
          <Route path="/dashboard/forms/new" element={<DashboardLayout title="Create Form"><CreateWizard /></DashboardLayout>} />
          <Route path="/dashboard/forms/new/wizard" element={<DashboardLayout title="Form Builder"><CreateWizard /></DashboardLayout>} />
          <Route path="/dashboard/forms/:id/edit" element={<DashboardLayout title="Edit Form"><CreateWizard /></DashboardLayout>} />
          <Route path="/dashboard/forms/:id/submissions" element={<DashboardLayout title="Submissions"><FormSubmissions /></DashboardLayout>} />
          <Route path="/dashboard/forms/:id/submissions/:subId" element={<DashboardLayout title="Submission Detail"><SubmissionDetail /></DashboardLayout>} />
          <Route path="/dashboard/settings" element={<DashboardLayout title="Settings"><SettingsPage /></DashboardLayout>} />
          <Route path="/dashboard/billing" element={<DashboardLayout title="Billing"><BillingPage /></DashboardLayout>} />
        </Route>

        {/* ─── SuperAdmin Routes (superadmin only) ────────── */}
        <Route element={<SuperAdminRoute />}>
          <Route path="/superadmin" element={<SuperAdminLayout title="Platform Overview"><SuperAdminOverview /></SuperAdminLayout>} />
          <Route path="/superadmin/organizations" element={<SuperAdminLayout title="Organizations"><SuperAdminOrgs /></SuperAdminLayout>} />
          <Route path="/superadmin/users" element={<SuperAdminLayout title="Users & Roles"><SuperAdminUsers /></SuperAdminLayout>} />
          <Route path="/superadmin/logs" element={<SuperAdminLayout title="Audit Logs"><AuditLogs /></SuperAdminLayout>} />
          <Route path="/superadmin/settings" element={<SuperAdminLayout title="Global Settings"><AdminSettings /></SuperAdminLayout>} />
          <Route path="/superadmin/support" element={<SuperAdminLayout title="Support Hub"><SupportHub /></SuperAdminLayout>} />
        </Route>

        {/* ─── 404 Fallback ──────────────────────────────── */}
        <Route path="*" element={
          <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
            <h1 className="text-6xl font-black text-primary">404</h1>
            <p className="mt-4 text-lg text-muted-foreground">Page not found.</p>
            <a href="/" className="mt-6 rounded-lg bg-primary px-6 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90">
              Go Home
            </a>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
};
