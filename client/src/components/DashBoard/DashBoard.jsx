// Dashboard.jsx
import React from 'react';
import VerticalNavbar from './VerticalNavbar';
import './DashBoard.css';
import './VerticalNavbar.css';
import SchedulingForm from './SchedulingForm'; // Rename SchedulingModal to SchedulingForm

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <VerticalNavbar />
      <div className="dashboard-content">
        <SchedulingForm />
        {/* Other content of the dashboard */}
      </div>
    </div>
  );
};

export default Dashboard;
