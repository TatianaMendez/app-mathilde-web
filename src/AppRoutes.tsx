import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Reset from './pages/reset';
import FormSocial from './pages/form-social';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="reset" element={<Reset />} />
      <Route path="form-social" element={<FormSocial />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
