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
        './CampaignForm': './src/components/organisms/FormSocial/FormSocial.tsx',
        './LoginForm': './src/components/organisms/Login/Login.tsx',
        './RegisterForm': './src/components/organisms/Register/Register.tsx',
        './ResetPass': './src/components/organisms/Login/ResetPassword/ResetPassword.tsx',
        './ValidationPass': './src/components/organisms/Login/ResetPassword/Validation.tsx',
        './Dashboard': './src/components/organisms/Dashboard/Dashboard.tsx',
      },
      remotes: {},
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@style': path.resolve(__dirname, './src/styles'),
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


