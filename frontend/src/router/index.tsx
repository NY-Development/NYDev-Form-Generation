import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProtectedRoute, PublicRoute } from './ProtectedRoutes';
import Landing from '../pages/public/Landing';
import Login from '../pages/auth/Login';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import Overview from '../pages/dashboard/Overview';
import Templates from '../pages/dashboard/forms/Templates';
import CreateWizard from '../pages/dashboard/forms/CreateWizard';
import FormAdminList from '../pages/dashboard/forms/AdminList';
import FormView from '../pages/public/FormView';
import RegistrationSuccess from '../pages/public/RegistrationSuccess';
import { SuperAdminLayout } from '../components/layout/SuperAdminLayout';
import SuperAdminOverview from '../pages/superadmin/Overview';

const NotFound = () => <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-background text-foreground"><h1 className="text-4xl font-bold mb-4">404</h1><p>Page Not Found</p><a href="/" className="mt-4 text-primary hover:underline">Go Home</a></div>;

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/f/:id',
    element: <FormView />,
  },
  {
    path: '/f/:id/success',
    element: <RegistrationSuccess />,
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/dashboard',
        element: (
          <DashboardLayout title="Overview">
            <Overview />
          </DashboardLayout>
        ),
      },
      {
        path: '/dashboard/forms/new',
        element: (
          <DashboardLayout title="Templates">
            <Templates />
          </DashboardLayout>
        ),
      },
      {
        path: '/dashboard/forms/new/wizard',
        element: (
          <DashboardLayout title="Wizard">
            <CreateWizard />
          </DashboardLayout>
        ),
      },
      {
        path: '/dashboard/forms/:id/admin',
        element: (
          <DashboardLayout title="Submissions">
            <FormAdminList />
          </DashboardLayout>
        ),
      },
      {
        path: '/admin',
        element: (
          <SuperAdminLayout title="Overview">
            <SuperAdminOverview />
          </SuperAdminLayout>
        ),
      },
      // More protected routes will go here
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
