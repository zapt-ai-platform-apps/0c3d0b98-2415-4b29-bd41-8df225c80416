import React from 'react';
import { useTranslation } from 'react-i18next';

const ZaptBadge = () => {
  const { t } = useTranslation();
  
  return (
    <a
      href="https://www.zapt.ai"
      target="_blank"
      rel="noopener noreferrer"
      className="zapt-badge"
    >
      {t('common.madeOnZapt')}
    </a>
  );
};

export default ZaptBadge;