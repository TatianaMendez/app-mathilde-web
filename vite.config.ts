import { defineConfig } from 'vite';
import React from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    React(),
    tsconfigPaths(),
    tailwindcss(),
    federation({
      name: 'appmathildeweb', // Nombre del remoto
      filename: 'remoteEntry.js',
      exposes: {
        './LoginForm': './app/components/pages/login/login.tsx',
        './RegisterForm': './app/components/pages/register/register.tsx',
        './ResetPass': './app/components/pages/login/resetPassword/resetPassword.tsx',
        './ValidationPass': './app/components/pages/login/resetPassword/validation.tsx',
        './Dashboard': './app/components/pages/dashboard/dashboard.tsx',
        './ThirdPartyCampaign': './app/components/pages/thirdPartyCampaign/thirdPartyCampaign.tsx',
        './SettingsUser': './app/components/pages/settings/settings.tsx',
        './autenticationService': './app/services/autenticationService.tsx',
        './Report': './app/components/pages/report/report.tsx',
      },
      remotes: {},
      shared: ['react', 'react-dom', 'react-router-dom', 'react-icons'],
    }),
    
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './app/components'),
      '@routes': path.resolve(__dirname, './app/routes'),
      '@utils': path.resolve(__dirname, './app/utils'),
      '@hooks': path.resolve(__dirname, './app/hooks'),
      '@domain': path.resolve(__dirname, './app/domain'),
      '@assets': path.resolve(__dirname, './app/assets'),
      '@style': path.resolve(__dirname, './app/styles'),
      '@services': path.resolve(__dirname, './app/services'), 
      '@store': path.resolve(__dirname, './app/store'),
    }
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  server: {
    port: 5173,
    cors: true
  },
});


