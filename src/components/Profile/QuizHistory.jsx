export default function QuizHistory({ quizHistory }) {
   const defaultHistory = [
      {
         title: "General Knowledge Quiz",
         date: new Date().toISOString(),
         correctAnswers: 8,
         totalQuestions: 10
      },
      {
         title: "Science Quiz",
         date: new Date().toISOString(),
         correctAnswers: 9,
         totalQuestions: 10
      },
      {
         title: "History Quiz",
         date: new Date().toISOString(),
         correctAnswers: 7,
         totalQuestions: 10
      }
   ];

   const historyToDisplay = quizHistory?.length > 0 ? quizHistory : defaultHistory;

   return (
      <aside className='bg-white rounded-md lg:shadow-md w-full lg:max-w-6xl mx-auto lg:col-start-1 lg:col-end-2 px-8 py-6 mt-10 flex flex-col justify-center text-slate-900'>
         <h2 className='text-2xl mb-4 font-medium mt-4 lg:mt-0'>Quiz History</h2>
         <ul className='space-y-3'>
            {historyToDisplay.map((quiz, index) => {
               const percentage = ((quiz.correctAnswers / quiz.totalQuestions) * 100).toFixed(1);
               return (
                  <li key={index} className='p-3 border rounded-md flex items-center gap-4'>
                     <div className='relative w-16 h-16'>
                        <svg className='w-full h-full' viewBox="0 0 36 36">
                           <path
                              className="text-gray-300"
                              d="M18 2.0845
                                 a 15.9155 15.9155 0 0 1 0 31.831
                                 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                           />
                           <path
                              className="text-blue-500"
                              d="M18 2.0845
                                 a 15.9155 15.9155 0 0 1 0 31.831
                                 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeDasharray={`${percentage}, 100`}
                           />
                        </svg>
                        <div className='absolute inset-0 flex items-center justify-center text-sm font-bold'>
                           {quiz.correctAnswers}/{quiz.totalQuestions}
                        </div>
                     </div>
                     <div>
                        <p><strong>Quiz:</strong> {quiz.title}</p>
                        <p><strong>Date:</strong> {new Date(quiz.date).toLocaleDateString()}</p>
                        <p><strong>Percentage:</strong> {percentage}%</p>
                     </div>
                  </li>
               );
            })}
            {!quizHistory && (
               <li className='p-3 border rounded-md flex items-center gap-4'>
                  <p>No quiz history available.</p>
               </li>
            )}
         </ul>
      </aside>
   )
}
