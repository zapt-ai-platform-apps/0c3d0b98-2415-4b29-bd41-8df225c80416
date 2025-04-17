import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  UserIcon,
  HomeIcon,
  Squares2X2Icon,
  CogIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useAuthContext } from '../../auth/components/AuthProvider';

const SidebarLink = ({ to, icon: Icon, children, active }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
      active ? 'bg-primary text-white' : 'hover:bg-gray-100'
    }`}
  >
    <Icon className="h-5 w-5" />
    <span>{children}</span>
  </Link>
);

const Sidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { user, signOut } = useAuthContext();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="w-64 bg-white shadow-md h-screen sticky top-0 overflow-y-auto py-6 px-4">
      <div className="flex flex-col h-full">
        <div className="mb-8 text-center">
          <h1 className="text-xl font-bold text-primary">
            {t('common.welcome')}
          </h1>
        </div>

        <nav className="flex flex-col gap-2 flex-grow">
          <SidebarLink to="/dashboard" icon={HomeIcon} active={isActive('/dashboard')}>
            {t('dashboard.title')}
          </SidebarLink>
          
          {user?.role === 'merchant' && (
            <SidebarLink to="/merchant" icon={Squares2X2Icon} active={isActive('/merchant')}>
              {t('merchant.title')}
            </SidebarLink>
          )}
          
          {user?.role === 'investor' && (
            <SidebarLink to="/investor" icon={Squares2X2Icon} active={isActive('/investor')}>
              {t('investor.title')}
            </SidebarLink>
          )}
          
          {user?.role === 'transport' && (
            <SidebarLink to="/transport" icon={Squares2X2Icon} active={isActive('/transport')}>
              {t('transport.title')}
            </SidebarLink>
          )}
          
          {user?.role === 'service' && (
            <SidebarLink to="/service" icon={Squares2X2Icon} active={isActive('/service')}>
              {t('service.title')}
            </SidebarLink>
          )}
          
          <SidebarLink to="/profile" icon={UserIcon} active={isActive('/profile')}>
            {t('profile.title')}
          </SidebarLink>
          
          <SidebarLink to="/settings" icon={CogIcon} active={isActive('/settings')}>
            {t('common.settings')}
          </SidebarLink>
        </nav>

        <div className="mt-auto">
          <button
            onClick={signOut}
            className="flex items-center gap-3 p-3 rounded-lg text-red-600 hover:bg-red-50 w-full transition-colors"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            <span>{t('auth.signOut')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;