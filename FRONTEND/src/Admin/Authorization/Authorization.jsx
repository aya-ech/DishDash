
import React from 'react';
import './Authorization.css'; 

const Authorization = () => {
  return (
    <div className="not-authorized">
      <h2>403 - Not Authorized</h2>
      <p>You do not have permission to access this page.</p>
    </div>
  );
};

export default Authorization;
