import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Importa los componentes remotos
import  CampaignForm from "./components/pages/formSocial/formSocial";
import  LoginForm from "./components/pages/login/login";
import  RegisterForm from "./components/pages/register/register";
import  ResetPass from "./components/pages/login/resetPassword/resetPassword";
import  ValidationForm from "./components/pages/login/resetPassword/validation";
import  DashbaordComp from "./components/pages/dashboard/dashboard";

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/reset" element={<ResetPass />} />
        <Route path="/form-social" element={<CampaignForm />} />
        <Route path="/validation" element={<ValidationForm />} />
        <Route path="/dashboard" element={<DashbaordComp/>} />
      </Routes>
    </Suspense>
  );
};

export default App;
