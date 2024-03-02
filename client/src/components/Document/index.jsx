import React, { useState } from 'react';
import Docxtemplater from 'docxtemplater';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import headerImage from './signature.png';

import headerImage from './headerImage.jpg'; // Import the header image

const Document = () => {
    const [inchargeName, setInchargeName] = useState('');
    const [inchargeBranch, setInchargeBranch] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventName, setEventName] = useState('');
    const [eventDuration, setEventDuration] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [eventIncharge, setEventIncharge] = useState('');
    const [clubName, setClubName] = useState('');
    const [yourName, setYourName] = useState('');

    const generateDocument = () => {
        try {
            // Load the Word document template
            const fileReader = new FileReader();
            fileReader.onload = (event) => {
                const zip = new JSZip();
                const doc = new Docxtemplater();
                const content = event.target.result;

                // Load the Word document template content into docxtemplater
                doc.loadZip(new JSZip(content));

                // Set the data to replace placeholders
                doc.setData({
                    inchargeName,
                    inchargeBranch,
                    eventDate,
                    eventName,
                    eventDuration,
                    startDate,
                    endDate,
                    eventIncharge,
                    clubName,
                    yourName,
                    image: { // Add the image data
                        data: headerImage, // Provide the image data
                        width: 200, // Adjust width as per your requirement
                        height: 100, // Adjust height as per your requirement
                    },
                });

                // Render the document
                doc.render();

                // Get the rendered document as a blob
                const generatedBlob = doc.getZip().generate({ type: 'blob' });

                // Save the generated document
                saveAs(generatedBlob, 'permission_request.docx');
            };

            // Read the Word document template file
            fileReader.readAsArrayBuffer(templateFile); // Assuming you have the template file stored somewhere
        } catch (error) {
            console.error('Error generating document:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={inchargeName}
                onChange={(e) => setInchargeName(e.target.value)}
                placeholder="Incharge Name"
            />
            <input
                type="text"
                value={inchargeBranch}
                onChange={(e) => setInchargeBranch(e.target.value)}
                placeholder="Incharge Branch"
            />
            <input
                type="text"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                placeholder="Event Date"
            />
            <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="Event Name"
            />
            <input
                type="text"
                value={eventDuration}
                onChange={(e) => setEventDuration(e.target.value)}
                placeholder="Event Duration"
            />
            <input
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="Start Date"
            />
            <input
                type="text"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="End Date"
            />
            <input
                type="text"
                value={eventIncharge}
                onChange={(e) => setEventIncharge(e.target.value)}
                placeholder="Event Incharge"
            />
            <input
                type="text"
                value={clubName}
                onChange={(e) => setClubName(e.target.value)}
                placeholder="Club Name"
            />
            <input
                type="text"
                value={yourName}
                onChange={(e) => setYourName(e.target.value)}
                placeholder="Your Name"
            />
            <button onClick={generateDocument}>Generate Document</button>
        </div>
    );
};

export default Document;
