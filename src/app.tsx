import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Importa los componentes remotos
import  CampaignForm from "@components/organisms/FormSocial/FormSocial";
import  LoginForm from "@components/organisms/Login/Login";
import  RegisterForm from "@components/organisms/Register/Register";
import  ResetPass from "@components/organisms/Login/ResetPassword/ResetPassword";
import  ValidationForm from "@components/organisms/Login/ResetPassword/Validation";
import  DashbaordComp from "@components/organisms/Dashboard/Dashboard";

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
