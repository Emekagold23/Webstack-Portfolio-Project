import React, { useEffect, useState } from 'react';
import { getQuizResult } from '../services/quizService';
import { useParams } from 'react-router-dom';

const FeedbackPage = () => {
  const { quizId } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function fetchResult() {
      const resultData = await getQuizResult(quizId);
      setResult(resultData);
    }
    fetchResult();
  }, [quizId]);

  if (!result) return <p>Loading...</p>;

  return (
    <div className="feedback-page">
      <h2>Quiz Feedback</h2>
      <p>Your Score: {result.score}/{result.totalPoints}</p>
      <ul>
        {result.questions.map((question, idx) => (
          <li key={idx}>
            <p>{question.text}</p>
            <p>Your answer: {question.userAnswer}</p>
            <p>Correct answer: {question.correctAnswer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackPage;
