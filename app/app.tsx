import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '~/services/autenticationService'; 
// import { AuthProvider } from '~/services/authService'; 
import ProtectedRoute  from '@hooks/useRouterLogin'; 

// Importa los componentes remotos
import LoginForm from "@components/pages/login/login";
import RegisterForm from "@components/pages/register/register";
import ResetPass from "@components/pages/login/resetPassword/resetPassword";
import ValidationForm from "@components/pages/login/resetPassword/validation";
import DashbaordComp from "@components/pages/dashboard/dashboard";
import Settings from "@components/pages/settings/settings";
import ThirdPartyCampaign from "@components/pages/thirdPartyCampaign/thirdPartyCampaign";
import SummaryCampaign from "@components/pages/thirdPartyCampaign/summaryCampaign";
import MassiveCampaigns from '@components/pages/thirdPartyCampaign/massiveCampaign';
import Report from '@components/pages/report/report';
import { Provider } from 'react-redux';
import { store } from '@store/store';

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/reset" element={<ResetPass />} />
          <Route path="/validation" element={<ValidationForm />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashbaordComp /></ProtectedRoute>} />
          <Route path="/settings" element={ <ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/thirdPartyCampaign" element={ <ProtectedRoute><ThirdPartyCampaign /></ProtectedRoute>} />
          <Route path="/summaryCampaign" element={ <ProtectedRoute><SummaryCampaign /></ProtectedRoute>} />
          <Route path="/massiveCampaign" element={ <ProtectedRoute><MassiveCampaigns /></ProtectedRoute>} />
          <Route path="/report" element={ <ProtectedRoute><Report /></ProtectedRoute>} />
        </Routes>
      </Suspense>
    </AuthProvider>
    </Provider>
  );
};

export default App;
