export default async function getQuestionsById(id, name) {
   if (!id) {
      throw new Error('ID is required to fetch questions');
   }
   if (!name) {
      throw new Error('Name is required to fetch questions');
   }
   try {
      const response = await fetch('/api/questions-quiz', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ id, name }), // Send both `id` and `name` in the request body
      });

      if (!response.ok) {
         const errorData = await response.json();
         throw new Error(errorData.message || 'Failed to fetch questions');
      }

      const data = await response.json();
      return data; // Return the fetched questions
   } catch (error) {
      console.error('Error fetching questions by ID:', error);
      throw error; // Re-throw the error for the caller to handle
   }
}
