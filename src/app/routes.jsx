import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import AuthForm from '../modules/auth/components/AuthForm';
import ProtectedRoute from '../modules/auth/components/ProtectedRoute';
import DashboardLayout from '../modules/dashboard/layouts/DashboardLayout';
import Dashboard from '../modules/dashboard/components/Dashboard';
import LandingPage from '../modules/landing/pages/LandingPage';
import ProfileRouter from '../modules/profile/pages/ProfileRouter';

// Create a page that renders a simple message
const UnauthorizedPage = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">غير مصرح</h1>
      <p className="mb-6">ليس لديك صلاحية للوصول إلى هذه الصفحة.</p>
      <a href="/dashboard" className="btn-primary">العودة إلى لوحة التحكم</a>
    </div>
  </div>
);

// Create placeholder pages for different role dashboards
const MerchantPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-6">صفحة التاجر</h1>
    <div className="card">
      <p>مرحبًا بك في صفحة التاجر. هنا يمكنك إدارة منتجاتك وطلباتك وبياناتك التجارية.</p>
    </div>
  </div>
);

const InvestorPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-6">صفحة المستثمر</h1>
    <div className="card">
      <p>مرحبًا بك في صفحة المستثمر. هنا يمكنك استعراض الفرص الاستثمارية وإدارة محفظتك.</p>
    </div>
  </div>
);

const TransportPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-6">صفحة محطة النقل</h1>
    <div className="card">
      <p>مرحبًا بك في صفحة محطة النقل. هنا يمكنك إدارة المحطة والمركبات والمسارات والجداول الزمنية.</p>
    </div>
  </div>
);

const ServicePage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-6">صفحة مقدم الخدمة</h1>
    <div className="card">
      <p>مرحبًا بك في صفحة مقدم الخدمة. هنا يمكنك إدارة خدماتك والمواعيد والعملاء.</p>
    </div>
  </div>
);

const SettingsPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-6">الإعدادات</h1>
    <div className="card">
      <p>هنا يمكنك تعديل إعدادات حسابك.</p>
    </div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <AuthForm />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: '/dashboard/profile',
        element: <Navigate to="/profile" replace />,
      },
    ],
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <ProfileRouter />,
      },
      {
        path: '/profile/:role',
        element: <ProfileRouter />,
      },
    ],
  },
  {
    path: '/merchant',
    element: (
      <ProtectedRoute allowedRoles={['merchant']}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <MerchantPage />,
      },
    ],
  },
  {
    path: '/investor',
    element: (
      <ProtectedRoute allowedRoles={['investor']}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <InvestorPage />,
      },
    ],
  },
  {
    path: '/transport',
    element: (
      <ProtectedRoute allowedRoles={['transport']}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <TransportPage />,
      },
    ],
  },
  {
    path: '/service',
    element: (
      <ProtectedRoute allowedRoles={['service']}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <ServicePage />,
      },
    ],
  },
  {
    path: '/settings',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: '/unauthorized',
    element: <UnauthorizedPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default router;