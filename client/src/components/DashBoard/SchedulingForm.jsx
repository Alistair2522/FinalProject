// SchedulingForm.jsx
import React, { useState } from 'react';
import './SchedulingForm.css';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import signatureImage from './signature.png';
import twilioCredentials from './twilioCredentials';

const SchedulingForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [club, setClub] = useState('');
  const [eventIncharge, setEventIncharge] = useState('');
  const [inchargeBranch, setInchargeBranch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [clubHead, setClubHead] = useState('');
  const [hod, setHod] = useState('');
  const [venue, setVenue] = useState('');
  const [time, setTime] = useState('');
  const [eventName, setEventName] = useState('');
  const [curDate, setCurDate] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    club: '',
    conveyor: '',
    branch: '',
    StartDate: '',
    EndDate:'',
    event: '',
    venue: '',
    time: '',
    clubName: '',
    clubHead: '',
    HOD:'',
  });

  const generateDocument = async () => {
    const zip = new JSZip();

    try {
        // Sample Word document content with placeholders
        const wordContent = `
        <w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
        <w:body>
            <w:p>
                <w:r>
                    <w:t>To: ${hod},</w:t>
                </w:r>
            </w:p>
            <w:p>
                <w:r>
                    <w:t>Date: ${curDate}</w:t>
                </w:r>
            </w:p>
            <w:p>
                <w:r>
                    <w:t>Subject: Request for Permission to Conduct Event</w:t>
                </w:r>
            </w:p>
            <w:p>
                <w:r>
                    <w:t>Dear Sir/Madam,</w:t>
                </w:r>
            </w:p>
            <w:p>
                <w:r>
                    <w:t>We are writing to seek permission to conduct an event titled "${eventName}" organized by ${club}.</w:t>
                </w:r>
            </w:p>
            <w:p>
                <w:r>
                    <w:t>The event is scheduled to take place from ${startDate} to ${endDate}.</w:t>
                </w:r>
            </w:p>
            <w:p>
                <w:r>
                    <w:t>The event will be supervised by ${eventIncharge}, and the club head is ${clubHead}.</w:t>
                </w:r>
            </w:p>
            <w:p>
                <w:r>
                    <w:t>We kindly request your permission to proceed with the event and assure you that all necessary measures will be taken to ensure its success.</w:t>
                </w:r>
            </w:p>
            <w:p>
                <w:r>
                    <w:t>Thank you for your attention.</w:t>
                </w:r>
            </w:p>
            <w:p>
                <w:r>
                    <w:t>Sincerely,</w:t>
                </w:r>
            </w:p>
            <w:p>
                <w:r>
                    <w:t>${firstName} ${lastName}</w:t>
                </w:r>
            </w:p>  
                              
        </w:body>
    </w:document>
`;
      
            // Create a folder named 'word' in the zip file
            const wordFolder = zip.folder('word');

            // Add the Word document content to 'word' folder
            wordFolder.file('document.xml', wordContent);

            // Add necessary XML files for a valid docx structure
            zip.file('[Content_Types].xml', `
            <Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
                <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
            </Types>
            `);
            zip.file('_rels/.rels', `
            <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
                <Relationship Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml" Id="rId1"/>
            </Relationships>
            `);
            zip.file('word/_rels/document.xml.rels', `
            <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
                <Relationship Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" Target="settings.xml" Id="rId1"/>
            </Relationships>
            `);
            // Generate the .docx file
            // zip.file('client/src/components/DashBoard/signature.png', /* Base64 or Blob of the visual representation */);
            const docxBlob = await zip.generateAsync({ type: 'blob' });

            // Save the generated .docx file
            saveAs(docxBlob, 'permission_request.docx');
        } catch (error) {
            console.error('Error generating document:', error);
        }
    };
    const sendWhatsAppMessage = async () => {
      try {
          // Form Twilio WhatsApp message data
          const formData = new FormData();
          formData.append('From', 'whatsapp:' + twilioCredentials.whatsappNumber);
          formData.append('To', 'whatsapp:' + "whatsapp:+1 (415) 523-8886"); // Replace recipientNumber with the recipient's WhatsApp number
          formData.append('Body', 'New event request');

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



  const clearFields = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setClub('');
    setEventIncharge('');
    setInchargeBranch('');
    setStartDate('');
    setEndDate('');
    setClubHead('');
    setHod('');
    setTime('');
    setEventName('');
};

  return (
    <form className="scheduling-form" onSubmit={clearFields}>
      <div className="form-row">
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={firstName.firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={lastName.lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email.email}
            onChange={(e) => setEmail(e.target.value)}
            required // Make email field compulsory
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          Club:
          <input
            type="text"
            name="club"
            value={club.club}
            onChange={(e) => setClub(e.target.value)}
          />
        </label>
        <label>
          Conveyor:
          <input
            type="text"
            name="conveyor"
            value={eventIncharge.eventIncharge}
            onChange={(e) => setEventIncharge(e.target.value)}
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          Branch:
          <input
            type="text"
            name="branch"
            value={inchargeBranch.inchargeBranch}
            onChange={(e) => setInchargeBranch(e.target.value)}
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          Start Date:
          <input
            type="text"
            name="date"
            value={startDate.StartDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type="text"
            name="EndDate"
            value={endDate.EndDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>

      <div className="form-row">
      <label>
          Venue:
          <input
            type="text"
            name="Venue"
            value={venue.venue}
            onChange={(e) => setVenue(e.target.value)}
          />
        </label>
        <label>
          Time:
          <input
            type="text"
            name="time"
            value={time.time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>
      </div>

      <div className="form-row">
                
      <label>
          HOD:
          <input
            type="text"
            name="HOD"
            value={hod.HOD}
            onChange={(e) => setHod(e.target.value)}
          />
        </label>
        <label>
          Club Head:
          <input
            type="text"
            name="clubHead"
            value={clubHead.clubHead}
            onChange={(e) => setClubHead(e.target.value)}
          />
        </label>
      </div>
      <div className="form-row">
      <label>
          Event:
          <input
            type="text"
            name="event"
            value={eventName.event}
            onChange={(e) => setEventName(e.target.value)}
          />
        </label>
        <label>
          Letter Date:
          <input
            type="text"
            name="curDate"
            value={curDate.curDate}
            onChange={(e) => setCurDate(e.target.value)}
          />
        </label>

      </div>
    
      <button onClick={generateDocument} type="submit">Submit</button>

      
      <link to ='/email'>    
      <button type="submit" className="send-email-button">Send Email</button>
      </link>

    </form>
  );
  };

export default SchedulingForm;
