import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../../auth/components/AuthProvider';

const Dashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuthContext();
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{t('dashboard.title')}</h1>
      
      <div className="card mb-6">
        <h2 className="text-xl font-semibold mb-4">{t('dashboard.welcome')}</h2>
        <p className="mb-4">
          {user?.email && (
            <span className="block mb-2">
              {t('profile.email')}: {user.email}
            </span>
          )}
          {user?.role && (
            <span className="block">
              {t('profile.role')}: {t(`roles.${user.role}`)}
            </span>
          )}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="card bg-primary bg-opacity-10">
          <h3 className="font-semibold mb-2">{t('dashboard.overview')}</h3>
          <p className="text-gray-700">
            {t('dashboard.welcome')}
          </p>
        </div>
        
        <div className="card bg-secondary bg-opacity-10">
          <h3 className="font-semibold mb-2">{t('dashboard.statistics')}</h3>
          <p className="text-gray-700">
            Statistics will appear here.
          </p>
        </div>
        
        <div className="card bg-accent bg-opacity-10">
          <h3 className="font-semibold mb-2">{t('dashboard.activity')}</h3>
          <p className="text-gray-700">
            Recent activity will appear here.
          </p>
        </div>
      </div>
      
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">{t('dashboard.notifications')}</h2>
        <p className="text-gray-700">
          No new notifications.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;