import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './QuizStart.css';

const QuizStart = () => {
  const { topic, subtopic } = useParams();
  const [startQuiz, setStartQuiz] = useState(false);

  return (
    <div className="quiz-start-container">
      <h1>{topic} - {subtopic}</h1>
      {!startQuiz ? (
        <div className="start-section">
          <p>Ready to start the quiz? Click below to begin.</p>
          <button onClick={() => setStartQuiz(true)} className="start-button">Start Quiz</button>
        </div>
      ) : (
        // Use backticks for the template literal
        <Link to={`/dashboard/quizzes/${topic}/${subtopic}/questions`}>
          <button className="go-to-quiz-button">Proceed to Quiz</button>
        </Link>
      )}
    </div>
  );
};

export default QuizStart;
