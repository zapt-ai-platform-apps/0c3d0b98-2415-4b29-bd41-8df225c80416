import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserIcon, ShoppingBagIcon, CurrencyDollarIcon, TruckIcon, WrenchIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { eventBus, events } from '../../core/events';
import { useAuthContext } from '../../auth/components/AuthProvider';
import * as Sentry from '@sentry/browser';
import Loading from '../../common/components/Loading';

const RoleCard = ({ icon: Icon, title, description, onClick, selected }) => (
  <div 
    className={`card cursor-pointer p-4 transition-all hover:shadow-md ${selected ? 'border-2 border-primary' : ''}`}
    onClick={onClick}
  >
    <div className="flex flex-col items-center gap-3">
      <div className="p-3 rounded-full bg-primary bg-opacity-10">
        <Icon className="h-8 w-8 text-primary" />
      </div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-center text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

const RoleSelection = () => {
  const { t } = useTranslation();
  const { user, session } = useAuthContext();
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const roles = [
    {
      id: 'client',
      icon: UserIcon,
      title: t('roles.client'),
      description: 'للمستخدمين الذين يبحثون عن خدمات أو منتجات'
    },
    {
      id: 'merchant',
      icon: ShoppingBagIcon,
      title: t('roles.merchant'),
      description: 'للتجار وأصحاب الأعمال الذين يقدمون المنتجات'
    },
    {
      id: 'investor',
      icon: CurrencyDollarIcon,
      title: t('roles.investor'),
      description: 'للمستثمرين الذين يبحثون عن فرص استثمارية'
    },
    {
      id: 'transport',
      icon: TruckIcon,
      title: t('roles.transport'),
      description: 'لمحطات النقل وخدمات النقل'
    },
    {
      id: 'service',
      icon: WrenchIcon,
      title: t('roles.service'),
      description: 'لمقدمي الخدمات المتخصصة'
    }
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
  };

  const handleSubmit = async () => {
    if (!selectedRole) return;
    
    setLoading(true);
    setError(null);
    
    try {
      if (!session) {
        throw new Error('No active session');
      }
      
      const response = await fetch('/api/user-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          role: selectedRole,
          email: user.email
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update role');
      }
      
      // Publish event that role was selected
      eventBus.publish(events.ROLE_SELECTED, { role: selectedRole });
      
      // Navigate to the appropriate screen based on role
      navigate(`/profile/${selectedRole}`);
      
    } catch (error) {
      console.error('Error setting role:', error);
      Sentry.captureException(error, {
        extra: {
          selectedRole,
          userId: user?.id
        }
      });
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">{t('roles.select')}</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {roles.map((role) => (
          <RoleCard
            key={role.id}
            icon={role.icon}
            title={role.title}
            description={role.description}
            onClick={() => handleRoleSelect(role.id)}
            selected={selectedRole === role.id}
          />
        ))}
      </div>
      
      <div className="flex justify-center">
        <button
          className="btn-primary cursor-pointer flex items-center gap-2 px-6 py-2"
          onClick={handleSubmit}
          disabled={!selectedRole || loading}
        >
          {loading ? <Loading size="small" /> : null}
          {t('common.next')}
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;