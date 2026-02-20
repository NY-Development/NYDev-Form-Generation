import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import NavBar from "../components/NavBar.jsx"; // Ensure correct path
import LandingPage from "../pages/LandingPage.jsx";
import GoogleSignInPage from "../pages/GoogleSignInPage.jsx";
import OrganizationDashboard from "../pages/OrganizationDashboard.jsx";
import OrgForms from "../pages/OrgForms.jsx";
import OrgBilling from "../pages/OrgBilling.jsx";
import OrgSettings from "../pages/OrgSettings.jsx";
import TemplateLibrary from "../pages/TemplateLibrary.jsx";
import IntegrationsPage from "../pages/IntegrationsPage.jsx";
import FormBuilderStep1 from "../pages/FormBuilderStep1.jsx";
import FormBuilderStep2 from "../pages/FormBuilderStep2.jsx";
import FormBuilderStep3 from "../pages/FormBuilderStep3.jsx";
import FormBuilderStep4 from "../pages/FormBuilderStep4.jsx";
import FormBuilderStep5 from "../pages/FormBuilderStep5.jsx";
import PublicRegistrationForm from "../pages/PublicRegistrationForm.jsx";
import RegistrationSuccess from "../pages/RegistrationSuccess.jsx";
import FormAdminRegistrationList from "../pages/FormAdminRegistrationList.jsx";
import SuperAdminDashboard from "../pages/SuperAdminDashboard.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import PageTransition from "../components/PageTransition.jsx";
import { ROLE_FORM_ADMIN, ROLE_ORG_ADMIN, ROLE_SUPERADMIN } from "../services/roleConstants";

const AppRouter = () => {
  const location = useLocation();

  return (
    <>      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><LandingPage /></PageTransition>} />
          <Route path="/auth/google" element={<PageTransition><GoogleSignInPage /></PageTransition>} />
          
          {/* Org Admin Routes */}
          <Route path="/org/dashboard" element={<ProtectedRoute roles={[ROLE_ORG_ADMIN]}><PageTransition><OrganizationDashboard /></PageTransition></ProtectedRoute>} />
          <Route path="/org/forms" element={<ProtectedRoute roles={[ROLE_ORG_ADMIN]}><PageTransition><OrgForms /></PageTransition></ProtectedRoute>} />
          <Route path="/org/billing" element={<ProtectedRoute roles={[ROLE_ORG_ADMIN]}><PageTransition><OrgBilling /></PageTransition></ProtectedRoute>} />
          <Route path="/org/settings" element={<ProtectedRoute roles={[ROLE_ORG_ADMIN]}><PageTransition><OrgSettings /></PageTransition></ProtectedRoute>} />
          <Route path="/org/templates" element={<ProtectedRoute roles={[ROLE_ORG_ADMIN]}><PageTransition><TemplateLibrary /></PageTransition></ProtectedRoute>} />
          <Route path="/org/integrations" element={<ProtectedRoute roles={[ROLE_ORG_ADMIN]}><PageTransition><IntegrationsPage /></PageTransition></ProtectedRoute>} />
          
          {/* Form Builder Steps */}
          <Route path="/builder/step-1" element={<ProtectedRoute roles={[ROLE_ORG_ADMIN]}><PageTransition><FormBuilderStep1 /></PageTransition></ProtectedRoute>} />
          <Route path="/builder/step-2" element={<ProtectedRoute roles={[ROLE_ORG_ADMIN]}><PageTransition><FormBuilderStep2 /></PageTransition></ProtectedRoute>} />
          <Route path="/builder/step-3" element={<ProtectedRoute roles={[ROLE_ORG_ADMIN]}><PageTransition><FormBuilderStep3 /></PageTransition></ProtectedRoute>} />
          <Route path="/builder/step-4" element={<ProtectedRoute roles={[ROLE_ORG_ADMIN]}><PageTransition><FormBuilderStep4 /></PageTransition></ProtectedRoute>} />
          <Route path="/builder/step-5" element={<ProtectedRoute roles={[ROLE_ORG_ADMIN]}><PageTransition><FormBuilderStep5 /></PageTransition></ProtectedRoute>} />
          
          {/* Public Routes */}
          <Route path="/forms/:formId" element={<PageTransition><PublicRegistrationForm /></PageTransition>} />
          <Route path="/forms/:formId/success" element={<PageTransition><RegistrationSuccess /></PageTransition>} />
          
          {/* Admin/SuperAdmin */}
          <Route path="/admin/forms/:formId/registrations" element={<ProtectedRoute roles={[ROLE_FORM_ADMIN]}><PageTransition><FormAdminRegistrationList /></PageTransition></ProtectedRoute>} />
          <Route path="/superadmin" element={<ProtectedRoute roles={[ROLE_SUPERADMIN]}><PageTransition><SuperAdminDashboard /></PageTransition></ProtectedRoute>} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default AppRouter;