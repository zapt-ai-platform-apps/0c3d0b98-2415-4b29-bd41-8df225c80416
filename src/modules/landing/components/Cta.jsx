import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Cta = () => {
  const { t } = useTranslation();
  
  return (
    <section className="bg-primary py-20 px-4 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">{t('landing.cta.title')}</h2>
        <p className="text-xl mb-8 opacity-90">
          {t('landing.cta.subtitle')}
        </p>
        
        <Link 
          to="/login" 
          className="btn-accent px-8 py-3 text-lg inline-block cursor-pointer"
        >
          {t('landing.cta.button')}
        </Link>
      </div>
    </section>
  );
};

export default Cta;