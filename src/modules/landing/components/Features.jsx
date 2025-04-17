import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChatBubbleLeftRightIcon, CogIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="card text-center p-6">
    <div className="mx-auto bg-primary bg-opacity-10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
      <Icon className="h-8 w-8 text-primary" />
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Features = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: ChatBubbleLeftRightIcon,
      title: t('landing.features.feature1.title'),
      description: t('landing.features.feature1.description')
    },
    {
      icon: CogIcon,
      title: t('landing.features.feature2.title'),
      description: t('landing.features.feature2.description')
    },
    {
      icon: ChartBarIcon,
      title: t('landing.features.feature3.title'),
      description: t('landing.features.feature3.description')
    }
  ];
  
  return (
    <section id="features" className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('landing.features.title')}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('landing.features.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;