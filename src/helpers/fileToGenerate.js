export default async function fileToGenerate(file, userId) {
    const formData = new FormData();
    formData.append('file', file); // Append the file
    formData.append('userId', userId); // Append the user ID

    try {
        const response = await fetch('/api/generate-from-file', {
            method: 'POST',
            body: formData, // Send the FormData object
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Response from generate-from-file:', data);
        return data;
    } catch (error) {
        console.error('Error in fileToGenerate:', error);
        throw error;
    }
}