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
        './CampaignForm': './app/components/organisms/FormSocial/FormSocial.tsx',
        './LoginForm': './app/components/organisms/Login/Login.tsx',
        './RegisterForm': './app/components/organisms/Register/Register.tsx',
        './ResetPass': './app/components/organisms/Login/ResetPassword/ResetPassword.tsx',
        './ValidationPass': './app/components/organisms/Login/ResetPassword/Validation.tsx',
        './Dashboard': './app/components/organisms/Dashboard/Dashboard.tsx',
      },
      remotes: {},
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './app/components'),
      '@routes': path.resolve(__dirname, './app/routes'),
      '@utils': path.resolve(__dirname, './app/utils'),
      '@hooks': path.resolve(__dirname, './app/hooks'),
      '@assets': path.resolve(__dirname, './app/assets'),
      '@style': path.resolve(__dirname, './app/styles'),
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
  }
});


