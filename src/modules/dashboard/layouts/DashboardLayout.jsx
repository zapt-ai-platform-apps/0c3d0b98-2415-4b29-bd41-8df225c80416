import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ZaptBadge from '../../common/components/ZaptBadge';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <main className="px-4 py-6">
          <Outlet />
        </main>
        
        <ZaptBadge />
      </div>
    </div>
  );
};

export default DashboardLayout;