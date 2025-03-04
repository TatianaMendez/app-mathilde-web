import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@services/autenticationService'; 
import ProtectedRoute  from '@hooks/useRouterLogin'; 

// Importa los componentes remotos
import CampaignForm from "@components/pages/formSocial/formSocial";
import LoginForm from "@components/pages/login/login";
import RegisterForm from "@components/pages/register/register";
import ResetPass from "@components/pages/login/resetPassword/resetPassword";
import ValidationForm from "@components/pages/login/resetPassword/validation";
import DashbaordComp from "@components/pages/dashboard/dashboard";
import Configuration from "~/components/pages/settings/settings";
const App = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/reset" element={<ResetPass />} />
          <Route path="/form-social" element={<CampaignForm />} />
          <Route path="/validation" element={<ValidationForm />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashbaordComp /></ProtectedRoute>} />
          <Route path="/configuration" element={ <ProtectedRoute><Configuration /></ProtectedRoute>} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};

export default App;
