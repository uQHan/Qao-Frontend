export default function saveQuestions(questions, quizId) {
   const formattedQuestions = questions.map((q) => ({
      quiz_id: quizId,
      content: q.question,
      answers: q.answers, // Adjust if the backend expects a different format
      correct_answer: q.correct,
      status: "ACTIVE",
   }));

   console.log('Formatted Questions:', formattedQuestions); // Log the formatted questions

   return fetch('/api/save-questions', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({ questions: formattedQuestions }), // Adjust if the backend expects a different structure
   })
      .then((response) => {
         if (!response.ok) {
            throw new Error('Failed to save questions');
         }
         return response.json();
      })
      .catch((error) => {
         console.error('Error saving questions:', error);
         throw error;
      });
}