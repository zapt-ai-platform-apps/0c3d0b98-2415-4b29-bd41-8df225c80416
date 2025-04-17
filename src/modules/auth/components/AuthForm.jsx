import React, { useState, useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../../../supabaseClient';
import { useTranslation } from 'react-i18next';

const AuthForm = () => {
  const { t } = useTranslation();
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-secondary mb-2">{t('common.signInWithZapt')}</h2>
        <a 
          href="https://www.zapt.ai" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          www.zapt.ai
        </a>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <Auth
          supabaseClient={supabase}
          appearance={{ 
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#3498db',
                  brandAccent: '#2980b9',
                },
              },
            },
            style: {
              button: {
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: '500',
                padding: '10px',
              },
              anchor: {
                color: '#3498db',
              },
              container: {
                direction: 'rtl',
              },
              label: {
                marginBottom: '8px',
                display: 'block',
                fontSize: '14px',
              },
              input: {
                padding: '10px',
                borderRadius: '6px',
                fontSize: '16px',
              },
            },
          }}
          localization={{
            variables: {
              sign_in: {
                email_label: t('auth.email'),
                password_label: t('auth.password'),
                button_label: t('auth.signIn'),
                social_provider_text: t('auth.orContinueWith'),
                link_text: t('auth.dontHaveAccount'),
              },
              sign_up: {
                email_label: t('auth.email'),
                password_label: t('auth.password'),
                button_label: t('auth.signUp'),
                social_provider_text: t('auth.orContinueWith'),
                link_text: t('auth.alreadyHaveAccount'),
              },
              magic_link: {
                email_input_label: t('auth.email'),
                button_label: t('auth.signIn'),
                link_text: t('auth.alreadyHaveAccount'),
              },
            },
          }}
          providers={['google', 'facebook', 'apple']}
          magicLink={true}
          view="magic_link"
        />
      </div>
    </div>
  );
};

export default AuthForm;