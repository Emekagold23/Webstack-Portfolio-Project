import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './QuizFeedback.css';

const QuizFeedback = () => {
  const { state } = useLocation();
  const selectedAnswers = state?.selectedAnswers || {};
  const questions = state?.questions || [];
  const navigate = useNavigate();

  const score = questions.reduce((total, question, idx) => {
    return total + (selectedAnswers[idx] === question.correct ? 1 : 0);
  }, 0);

  return (
    <div className="feedback-container">
      <h1>Quiz Feedback</h1>
      <p>Score: {score} / {questions.length}</p>

      <div className="feedback-details">
        {questions.map((question, idx) => (
          <div key={idx} className="question-feedback">
            <h3>{question.question}</h3>
            <p>Your answer: {question.options[selectedAnswers[idx]]}</p>
            <p>Correct answer: {question.options[question.correct]}</p>
            {selectedAnswers[idx] !== question.correct && <p>Correction: Please review this concept.</p>}
          </div>
        ))}
      </div>

      <button onClick={() => navigate('/dashboard/quizzes')} className="back-button">Back to Quizzes</button>
    </div>
  );
};

export default QuizFeedback;
