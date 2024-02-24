import React from 'react';
import './loading.css'; // Add CSS for styling
import logo from "./assets/linkedinlogo.gif"
const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <img src={logo} alt="Loading..." />

    </div>
  );
};

export default LoadingSpinner;
