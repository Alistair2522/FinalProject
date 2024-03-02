import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmailRestAPI = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Your EmailJS service ID, template ID, and Public Key
    const serviceId = 'service_iiekm0b';
    const templateId = 'template_2bb8d5r';
    const publicKey = 'z_OzC4ai_gRdat-78';

    const data = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        from_name: name,
        from_email: email,
        to_name: 'Web Wizard',
        message: message,
      },
    };

    try {
      // Use your backend API endpoint to send emails
      const response = await axios.post('YOUR_BACKEND_EMAIL_API_ENDPOINT', data);
      console.log(response.data);
      setName('');
      setEmail('');
      setMessage('');
      // Navigate to the "email" route after successful submission
      navigate('/email');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='emailForm'>
        {/* ... (your input fields) */}
        <button type="submit">Send Email</button>
      </form>
    </div>
  );
};

export default EmailRestAPI;
