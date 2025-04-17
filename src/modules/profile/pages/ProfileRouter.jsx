import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../auth/components/AuthProvider';
import RoleSelection from '../components/RoleSelection';
import ClientProfile from '../components/ClientProfile';
import MerchantProfile from '../components/MerchantProfile';
import InvestorProfile from '../components/InvestorProfile';
import TransportProfile from '../components/TransportProfile';
import ServiceProfile from '../components/ServiceProfile';
import Loading from '../../common/components/Loading';
import * as Sentry from '@sentry/browser';

const ProfileRouter = () => {
  const { role } = useParams();
  const { session } = useAuthContext();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  
  // Fetch user profile data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!session) {
        return;
      }
      
      try {
        const response = await fetch('/api/user-profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${session.access_token}`
          }
        });
        
        if (response.status === 404) {
          // No profile exists yet
          setUserData(null);
          setLoading(false);
          return;
        }
        
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        
        const data = await response.json();
        setUserData(data);
        
        // If we're on the role selection page but user already has a role,
        // redirect to their specific profile page
        if (!role && data.user.role) {
          navigate(`/profile/${data.user.role}`);
        }
        
      } catch (error) {
        console.error('Error fetching user profile:', error);
        Sentry.captureException(error);
        setError('Failed to load profile data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    if (session) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [session, role, navigate]);
  
  if (loading) {
    return <Loading />;
  }
  
  if (error) {
    return (
      <div className="max-w-md mx-auto p-6 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <button 
          className="btn-primary cursor-pointer"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }
  
  // If no role parameter, show role selection
  if (!role) {
    return <RoleSelection />;
  }
  
  // Otherwise show the appropriate profile form based on role
  switch (role) {
    case 'client':
      return <ClientProfile initialData={userData} />;
    case 'merchant':
      return <MerchantProfile initialData={userData} />;
    case 'investor':
      return <InvestorProfile initialData={userData} />;
    case 'transport':
      return <TransportProfile initialData={userData} />;
    case 'service':
      return <ServiceProfile initialData={userData} />;
    default:
      // Invalid role parameter
      navigate('/profile');
      return <Loading />;
  }
};

export default ProfileRouter;