import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-gradient-to-br from-primary to-secondary text-white py-20 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {t('landing.hero.title')}
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
          {t('landing.hero.subtitle')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/login" 
            className="btn-accent px-8 py-3 text-lg cursor-pointer"
          >
            {t('landing.hero.cta')}
          </Link>
          
          <a 
            href="#features" 
            className="btn-outline text-white border-white px-8 py-3 text-lg cursor-pointer"
          >
            {t('landing.hero.learnMore')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;