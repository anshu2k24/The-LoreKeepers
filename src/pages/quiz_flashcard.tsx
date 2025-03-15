import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { db } from './firebase';

const QuizFlashcard = () => {
  const { id } = useParams();
  const history = useHistory();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds

  useEffect(() => {
    const fetchQuestions = async () => {
      const doc = await db.collection('quizzes').doc(id).get();
      if (doc.exists) {
        setQuestions(doc.data().questions);
      }
    };

    fetchQuestions();
  }, [id]);

  useEffect(() => {
    if (timeLeft === 0) {
      history.push(`/quiz/${id}/result`, { score });
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, history, id, score]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setScore((prev) => prev + 1);
    }

    setSelectedOption(null);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handleFinishQuiz = () => {
    history.push(`/quiz/${id}/result`, { score });
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  if (currentQuestionIndex >= questions.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
        <h1 className="text-3xl font-bold text-neutral-900 mb-4">Quiz Finished!</h1>
        <p className="text-neutral-600">Your score: {score}/{questions.length}</p>
        <button
          onClick={() => history.push('/')}
          className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
        >
          Back to Notes
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-neutral-900 mb-4">Quiz</h1>
        <p className="text-neutral-600">Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}</p>
        <div className="mt-6">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">
            {currentQuestion.question}
          </h2>
          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(option)}
                className={`w-full px-4 py-2 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 transition-all ${
                  selectedOption === option ? 'bg-purple-100' : ''
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleNextQuestion}
            disabled={!selectedOption}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all disabled:opacity-50"
          >
            Next Question
          </button>
          <button
            onClick={handleFinishQuiz}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-teal-600 transition-all"
          >
            Finish Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizFlashcard;