import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Cta from '../components/Cta';
import ZaptBadge from '../../common/components/ZaptBadge';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LandingPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">منصة متعددة الأطراف</h1>
          
          <div>
            <Link 
              to="/login" 
              className="btn-primary cursor-pointer"
            >
              {t('auth.signIn')}
            </Link>
          </div>
        </div>
      </header>
      
      <main>
        <Hero />
        <Features />
        <Cta />
      </main>
      
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">منصة متعددة الأطراف</h3>
              <p className="text-gray-400">
                منصة متكاملة لربط جميع الأطراف من عملاء وتجار ومستثمرين ومحطات نقل ومقدمي خدمات.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">الرئيسية</Link></li>
                <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors">تسجيل الدخول</Link></li>
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">المميزات</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
              <p className="text-gray-400">
                info@multiparty-platform.com<br />
                +966 123 456 7890
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} منصة متعددة الأطراف. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
      
      <ZaptBadge />
    </div>
  );
};

export default LandingPage;