import formidable from 'formidable';
import fs from 'fs';

export const config = {
    api: {
        bodyParser: false, // Disable Next.js body parsing to handle file uploads
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests allowed' });
    }

    const form = new formidable.IncomingForm();
    form.uploadDir = './uploads'; // Temporary directory for uploaded files
    form.keepExtensions = true; // Keep file extensions

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error('Error parsing form:', err);
            return res.status(500).json({ message: 'Error parsing form' });
        }

        const userId = fields.userId; // Extract user ID
        const file = files.file; // Extract the uploaded file

        if (!userId || !file) {
            return res.status(400).json({ message: 'Missing userId or file' });
        }

        try {
            // Forward the file and userId to the backend
            const response = await fetch(`${process.env.REST_API_URL}/process-file`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    filePath: file.filepath, // Path to the uploaded file
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                return res.status(response.status).json({
                    message: data.message || 'Failed to process file',
                });
            }

            return res.status(200).json(data);
        } catch (error) {
            console.error('Error forwarding to backend:', error);
            return res.status(500).json({ message: 'Error forwarding to backend' });
        }
    });
}