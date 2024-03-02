// VerticalNavbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const VerticalNavbar = () => {
  return (
    <div className="vertical-navbar">
      <Link to="/dashboard" className="nav-link">Home</Link>
      <Link to="/email" className="nav-link">Send Email</Link>
      <Link to="/dashboard/settings" className="nav-link">Settings</Link>
      <Link to="/cal" className="nav-link">Calendar</Link>
      {/* Add more links as needed */}
    </div>
  );
};

export default VerticalNavbar;
