import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../../auth/components/AuthProvider';
import * as Sentry from '@sentry/browser';
import Loading from '../../common/components/Loading';
import ErrorMessage from '../../common/components/ErrorMessage';
import { useNavigate } from 'react-router-dom';

const TransportProfile = ({ initialData }) => {
  const { t } = useTranslation();
  const { session } = useAuthContext();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    phone: initialData?.phone || '',
    stationName: initialData?.roleData?.stationName || '',
    stationType: initialData?.roleData?.stationType || '',
    location: initialData?.roleData?.location || '',
    capacity: initialData?.roleData?.capacity || '',
    operatingHours: initialData?.roleData?.operatingHours || ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await fetch('/api/user-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          role: 'transport',
          stationName: formData.stationName,
          stationType: formData.stationType,
          location: formData.location,
          capacity: formData.capacity ? parseInt(formData.capacity, 10) : null,
          operatingHours: formData.operatingHours
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }
      
      setSuccess(true);
      
      // Navigate to dashboard after successful profile update
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
      
    } catch (error) {
      console.error('Error updating profile:', error);
      Sentry.captureException(error, {
        extra: {
          formData
        }
      });
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">{t('transport.title')}</h1>
      
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="name" className="label">{t('profile.name')}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field box-border"
                placeholder={t('profile.name')}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone" className="label">{t('profile.phone')}</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input-field box-border"
                placeholder={t('profile.phone')}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="stationName" className="label">{t('transport.stationName')}</label>
            <input
              type="text"
              id="stationName"
              name="stationName"
              value={formData.stationName}
              onChange={handleChange}
              className="input-field box-border"
              placeholder={t('transport.stationName')}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="stationType" className="label">{t('transport.stationType')}</label>
            <input
              type="text"
              id="stationType"
              name="stationType"
              value={formData.stationType}
              onChange={handleChange}
              className="input-field box-border"
              placeholder={t('transport.stationType')}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="location" className="label">{t('transport.location')}</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input-field box-border"
              placeholder={t('transport.location')}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="capacity" className="label">{t('transport.capacity')}</label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="input-field box-border"
                placeholder={t('transport.capacity')}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="operatingHours" className="label">{t('transport.operatingHours')}</label>
              <input
                type="text"
                id="operatingHours"
                name="operatingHours"
                value={formData.operatingHours}
                onChange={handleChange}
                className="input-field box-border"
                placeholder={t('transport.operatingHours')}
              />
            </div>
          </div>
          
          {error && <ErrorMessage message={error} />}
          
          {success && (
            <div className="success-message mb-4">
              {t('profile.updateSuccess')}
            </div>
          )}
          
          <div className="flex justify-center">
            <button
              type="submit"
              className="btn-primary cursor-pointer px-6 py-2 flex items-center gap-2"
              disabled={loading}
            >
              {loading && <Loading size="small" />}
              {t('common.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransportProfile;