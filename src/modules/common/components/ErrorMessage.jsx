import React from 'react';

const ErrorMessage = ({ message, className = '' }) => {
  if (!message) return null;
  
  return (
    <div className={`error-message ${className}`}>
      {message}
    </div>
  );
};

export default ErrorMessage;