import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/routes';
import { AuthProvider } from './modules/auth/components/AuthProvider';

export default function App() {
  return (
    <div className="app-container">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}