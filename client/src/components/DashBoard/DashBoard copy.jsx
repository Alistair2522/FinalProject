// Dashboard.jsx
import React from 'react';
import VerticalNavbar from './VerticalNavbar';
import './DashBoard.css';
import './VerticalNavbar.css';
import SchedulingForm from './SchedulingForm'; // Rename SchedulingModal to SchedulingForm
import Venues from './Venues'; // Import the Venues component
import twilioCredentials from './twilioCredentials';

const Dashboard = () => {
  const sendWhatsAppMessage = async () => {
    try {
        // Form Twilio WhatsApp message data
        const formData = new FormData();
        formData.append('From', 'whatsapp:' + twilioCredentials.whatsappNumber);
        formData.append('To', 'whatsapp:' + 7506189978); // Replace recipientNumber with the recipient's WhatsApp number
        formData.append('Body', 'Your message here');

        // Send WhatsApp message via Twilio
        await fetch('https://api.twilio.com/2010-04-01/Accounts/' + twilioCredentials.accountSid + '/Messages.json', {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa(twilioCredentials.accountSid + ':' + twilioCredentials.authToken),
            },
            body: formData,
        });

        console.log('WhatsApp message sent successfully');
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
    }
};
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
