// VerticalNavbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const VerticalNavbar = () => {
  return (
    <div className="vertical-navbar">
      <Link to="/dashboard" className="nav-link">Home</Link>
      <Link to="/dashboard/SEvent" className="nav-link">Schedule Event</Link>
      <Link to="/dashboard/settings" className="nav-link">Settings</Link>
      {/* Add more links as needed */}
    </div>
  );
};

export default VerticalNavbar;
