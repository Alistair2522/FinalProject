import React, { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

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

    const generateDocument = async () => {
        const zip = new JSZip();

        try {
            // Sample Word document content with placeholders
            const wordContent = `
                <w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
                    <w:body>
                        <w:p>
                            <w:r>
                                <w:t>To: ${inchargeName}, ${inchargeBranch}</w:t>
                            </w:r>
                        </w:p>
                        <w:p>
                            <w:r>
                                <w:t>Date: ${eventDate}</w:t>
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
                                <w:t>We are writing to seek permission to conduct an event titled "${eventName}" organized by ${clubName} at our institution.</w:t>
                            </w:r>
                        </w:p>
                        <w:p>
                            <w:r>
                                <w:t>The event is scheduled to take place from ${startDate} to ${endDate}, and its duration is estimated to be ${eventDuration}.</w:t>
                            </w:r>
                        </w:p>
                        <w:p>
                            <w:r>
                                <w:t>The event will be supervised by ${eventIncharge}.</w:t>
                            </w:r>
                        </w:p>
                        <w:p>
                            <w:r>
                                <w:t>We kindly request your permission to proceed with the event and would appreciate your support in ensuring its success.</w:t>
                            </w:r>
                        </w:p>
                        <w:p>
                            <w:r>
                                <w:t>Thank you.</w:t>
                            </w:r>
                        </w:p>
                        <w:p>
                            <w:r>
                                <w:t>Sincerely,</w:t>
                            </w:r>
                        </w:p>
                        <w:p>
                            <w:r>
                                <w:t>${yourName}</w:t>
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
            const docxBlob = await zip.generateAsync({ type: 'blob' });

            // Save the generated .docx file
            saveAs(docxBlob, 'permission_request.docx');
        } catch (error) {
            console.error('Error generating document:', error);
        }
    };

    return (
        <div style={{ backgroundColor: '#3bb19b', padding: '20px', borderRadius: '10px', maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ color: '#fff' }}>Event Permission Request</h2>
            <input
                type="text"
                value={inchargeName}
                onChange={(e) => setInchargeName(e.target.value)}
                placeholder="Incharge Name"
                style={{ width: '100%', marginBottom: '10px', padding: '5px', boxSizing: 'border-box' }}
            />
            <input
                type="text"
                value={inchargeBranch}
                onChange={(e) => setInchargeBranch(e.target.value)}
                placeholder="Incharge Branch"
                style={{ width: '100%', marginBottom: '10px', padding: '5px', boxSizing: 'border-box' }}
            />
            <input
                type="text"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                placeholder="Event Date"
                style={{ width: '100%', marginBottom: '10px', padding: '5px', boxSizing: 'border-box' }}
            />
            <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="Event Name"
                style={{ width: '100%', marginBottom: '10px', padding: '5px', boxSizing: 'border-box' }}
            />
            <input
                type="text"
                value={eventDuration}
                onChange={(e) => setEventDuration(e.target.value)}
                placeholder="Event Duration"
                style={{ width: '100%', marginBottom: '10px', padding: '5px', boxSizing: 'border-box' }}
            />
            <input
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="Start Date"
                style={{ width: '100%', marginBottom: '10px', padding: '5px', boxSizing: 'border-box' }}
            />
            <input
                type="text"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="End Date"
                style={{ width: '100%', marginBottom: '10px', padding: '5px', boxSizing: 'border-box' }}
            />
            <input
                type="text"
                value={eventIncharge}
                onChange={(e) => setEventIncharge(e.target.value)}
                placeholder="Event Incharge"
                style={{ width: '100%', marginBottom: '10px', padding: '5px', boxSizing: 'border-box' }}
            />
            <input
                type="text"
                value={clubName}
                onChange={(e) => setClubName(e.target.value)}
                placeholder="Club Name"
                style={{ width: '100%', marginBottom: '10px', padding: '5px', boxSizing: 'border-box' }}
            />
            <input
                type="text"
                value={yourName}
                onChange={(e) => setYourName(e.target.value)}
                placeholder="Your Name"
                style={{ width: '100%', marginBottom: '20px', padding: '5px', boxSizing: 'border-box' }}
            />
            <button onClick={generateDocument} style={{ width: '100%', padding: '10px', backgroundColor: '#fff', color: '#3bb19b', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Generate Document</button>
        </div>
    );
};

export default Document;
