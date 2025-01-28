import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importa tus rutas
import Login from './pages/login';
import Register from './pages/register';
import Reset from './pages/reset';
import FormSocial from './pages/form-social';

// Importa tus estilos globales
import './index.css';
import "@styles/styleAtoms.css";
import './app.css';

// Enlaces para fuentes y estilos
const Links = () => (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
    />
  </>
);

// Configuración del layout principal
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-sans bg-gray-100 text-gray-900">
      {children}
    </div>
  );
}
// Componente principal de la aplicación
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="reset" element={<Reset />} />
      <Route path="form-social" element={<FormSocial />} />
    </Routes>
  </BrowserRouter>
);

// Renderización de la aplicación
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
