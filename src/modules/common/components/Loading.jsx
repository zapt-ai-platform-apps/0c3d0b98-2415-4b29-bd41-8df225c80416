import React from 'react';
import { useTranslation } from 'react-i18next';

const Loading = ({ size = 'default', message }) => {
  const { t } = useTranslation();
  
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    default: 'w-8 h-8 border-4',
    large: 'w-12 h-12 border-4'
  };
  
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={`${sizeClasses[size]} border-t-transparent border-primary rounded-full animate-spin`}></div>
      <p className="mt-2 text-gray-600">{message || t('common.loading')}</p>
    </div>
  );
};

export default Loading;