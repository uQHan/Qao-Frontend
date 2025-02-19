import { useState } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { IoMdSave } from 'react-icons/io';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { AiFillBulb } from "react-icons/ai";
import Image from 'next/image';

const QuizQuestionCreator = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({ question: '', answers: ['', '', '', ''], correct: '' });

  const addQuestion = () => {
    if (currentQuestion.question.trim()) {
      setQuestions([...questions, currentQuestion]);
      setCurrentQuestion({ question: '', answers: ['', '', '', ''], correct: '' });
    }
  };

  const updateQuestion = (value) => {
    setCurrentQuestion({ ...currentQuestion, question: value });
  };

  const updateOption = (index, value) => {
    const updatedAnswers = [...currentQuestion.answers];
    updatedAnswers[index] = value;
    setCurrentQuestion({ ...currentQuestion, answers: updatedAnswers });
  };

  const selectCorrectAnswer = (qIndex, aIndex, event) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) =>
        i === qIndex ? { ...q, correct: q.answers[aIndex] } : q
      )
    );

    // Remove 'correctAnswer' class from all buttons within the question
    const buttons = event.target.closest('ul').querySelectorAll('button');
    buttons.forEach((btn) => btn.classList.remove('correctAnswer'));

    // Apply effects to the selected answer
    event.target.parentNode.classList.add('shake-left-right');
    event.target.classList.add('correctAnswer');

    // Remove shake effect after animation completes (adjust timing as needed)
    setTimeout(() => {
      event.target.parentNode.classList.remove('shake-left-right');
    }, 600);
  };


  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <FaRegQuestionCircle className="mr-2 text-blue-500" /> Create a Quiz
      </h2>

      <div className="border-b pb-4 mb-4">
        <input
          type="text"
          placeholder="Enter your question"
          value={currentQuestion.question}
          onChange={(e) => updateQuestion(e.target.value)}
          className="w-full p-2 border rounded-md focus:ring"
        />
        <div className="mt-2 space-y-2">
          {currentQuestion.answers.map((opt, oIndex) => (
            <input
              key={oIndex}
              type="text"
              placeholder={`Answer ${['A', 'B', 'C', 'D'][oIndex]}`}
              value={opt}
              onChange={(e) => updateOption(oIndex, e.target.value)}
              className="w-full p-2 border rounded-md focus:ring"
            />
          ))}
        </div>

        <div className="flex space-x-4 my-4">
          <button onClick={addQuestion} className="btn-primary flex items-center space-x-2">
            <FiPlus /> <span>Add Question</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <IoMdSave /> <span>Save Quiz</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <AiFillBulb /> <span>Ai Addition</span>
          </button>
        </div>
      </div>

      {questions.map((question, i) => (
        <div key={i} className="mb-6">
          <p className='rounded-md h-32 md:h-[6.5rem] flex justify-center items-center bg-blue-500 px-5 md:px-10 py-6 text-white text-xl font-semibold mb-3'>
            {question.question}
          </p>
          <ul className={`md:columns-2 mt-4 ${'answers-' + (i + 1)}`}>
            {question.answers.map((answer, j) => (
              <li key={j + answer} className="relative">
                <button className={`${'answer-' + (j + 1)} peer btn-primary w-full shadow-sm pl-12 py-3 px-5 rounded mb-6 ${answer.length > 24 ? 'text-sm' : ''}`}
                  onClick={(e) => selectCorrectAnswer(i, j, e)}> {answer || '---'} </button>
                <Image className='absolute pointer-events-none left-2 top-1 peer-disabled:translate-y-0 peer-hover:translate-y-[0.25em] peer-active:translate-y-[0.75em] transition-transform z-20 invert' src={`/letters/letter-${['a', 'b', 'c', 'd'][j]}.svg`} width={40} height={40} alt={`Question ${j + 1}]}`} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default QuizQuestionCreator;
