export default async function fileToGenerate(file, quizId) {
    console.log('fileToGenerate called with file:', file);

    try {
        const formData = new FormData();
        formData.append('quiz_id', 500000); // Add quiz ID
        formData.append('data', file); // Add the file itself

        const response = await fetch('https://6f2b-171-251-29-131.ngrok-free.app/n8n/upload', {
            method: 'POST',
            body: formData, // Send the FormData object
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log('Response from generate-from-file:', responseData);
        return responseData;
    } catch (error) {
        console.error('Error in fileToGenerate:', error);
        throw error;
    }
}