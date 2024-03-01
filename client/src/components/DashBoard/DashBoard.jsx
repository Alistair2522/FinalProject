// Dashboard.jsx
import React from 'react';
import VerticalNavbar from './VerticalNavbar';
import './DashBoard.css';
import './VerticalNavbar.css';
import SchedulingForm from './SchedulingForm'; // Rename SchedulingModal to SchedulingForm
import Venues from './Venues'; // Import the Venues component

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <VerticalNavbar />
      <div className="dashboard-content">
        <SchedulingForm />
        {/* Other content of the dashboard */}
        <Venues /> {/* Include the Venues component here */}
      </div>
    </div>
  );
};

export default Dashboard;
