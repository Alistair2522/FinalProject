import React from 'react';
import axios from 'axios';
import Docxtemplater from 'docxtemplater';
import JSZip from 'jszip';

const UploadToCloudinary = () => {
    // Function to generate the Word document
    const generateWordDocument = () => {
        try {
            // Load the Word document template
            const templateContent = fs.readFileSync('path/to/word/template.docx', 'binary');
            const zip = new JSZip(templateContent);
            const doc = new Docxtemplater();
            doc.loadZip(zip);

            // Data for the Word document template
            const data = {
                title: 'Sample Event Request',
                eventDate: '2024-03-01',
                organizer: 'John Doe',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
                // Add more data fields as needed
            };

            // Set the data for the template
            doc.setData(data);

            // Render the template with the data
            doc.render();

            // Get the rendered document as a buffer
            const renderedContent = doc.getZip().generate({ type: 'nodebuffer' });

            // Set the generated Word document as the file to upload
            setWordFile(renderedContent);
        } catch (error) {
            console.error('Error generating Word document:', error);
        }
    };

    // Function to handle file upload to Cloudinary
    const handleUpload = async () => {
        if (wordFile) {
            const formData = new FormData();
            formData.append('file', wordFile);
            formData.append('upload_preset', 'your_upload_preset'); // Replace 'your_upload_preset' with your Cloudinary upload preset

            try {
                // Make a POST request to Cloudinary Upload API
                const response = await axios.post('https://api.cloudinary.com/v1_1/your_cloud_name/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                // Handle the response from Cloudinary
                console.log('File uploaded to Cloudinary:', response.data);
                // You can use the response data (e.g., response.data.url) to display or use the uploaded file in your application
            } catch (error) {
                console.error('Error uploading file to Cloudinary:', error);
            }
        }
    };

    return (
        <div>
            {/* Button to generate Word document */}
            <button onClick={generateWordDocument}>Generate Word Document</button>

            {/* Button to upload Word document to Cloudinary */}
            <button onClick={handleUpload} disabled={!wordFile}>Upload to Cloudinary</button>
        </div>
    );
};

export default UploadToCloudinary;
