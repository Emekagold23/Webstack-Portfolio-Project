import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './QuizQuestions.css';

// Spinner Component
const Spinner = () => (
  <div className="spinner">
    <div className="double-bounce1"></div>
    <div className="double-bounce2"></div>
  </div>
);

const QuizQuestions = () => {
  const { topic, subtopic } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [showConfirmation, setShowConfirmation] = useState(false); // Confirmation prompt state
  const navigate = useNavigate();

  useEffect(() => {
    // Simulated fetching questions
    const fetchQuestions = () => {
      const data = [
        { question: 'What is React?', options: ['Library', 'Framework', 'Language', 'Tool'], correct: 0 },
        { question: 'What is JSX?', options: ['Syntax', 'Style', 'Structure', 'None'], correct: 0 },
        { question: 'What does HTML stand for?', options: ['Hypertext Markup Language', 'Hypertext Multiple Language', 'Hightext Markup Language', 'None'], correct: 0 },
        { question: 'Which company developed JavaScript?', options: ['Netscape', 'Mozilla', 'Microsoft', 'Oracle'], correct: 0 },
        { question: 'What is the purpose of CSS?', options: ['Structure content', 'Style content', 'Store data', 'None'], correct: 1 },
        { question: 'Which HTML tag is used to define an internal style sheet?', options: ['<style>', '<css>', '<script>', '<stylesheet>'], correct: 0 },
        { question: 'Which of the following is a JavaScript framework?', options: ['React', 'Django', 'Flask', 'Ruby on Rails'], correct: 0 },
        { question: 'What is the correct syntax to create a function in JavaScript?', options: ['function myFunction()', 'function:myFunction()', 'myFunction():function', 'None'], correct: 0 },
        { question: 'Which HTML attribute is used to define inline styles?', options: ['class', 'style', 'font', 'styles'], correct: 1 },
        { question: 'What is the main purpose of using React?', options: ['Building user interfaces', 'Database management', 'Web server management', 'None'], correct: 0 },
      ];
      setQuestions(data);
      setLoading(false); // Update loading state
    };
    fetchQuestions();

    // Timer logic
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev > 0) return prev - 1;
        clearInterval(timer);
        submitQuiz(); // Automatically submit the quiz when time runs out
        return 0;
      });
    }, 1000);

    return () => clearInterval(timer); 
  }, []);

  const handleAnswerSelection = (index) => {
    setSelectedAnswers({ ...selectedAnswers, [currentIndex]: index });
  };

  const submitQuiz = () => {
    setSubmitted(true);
    setTimeout(() => {
      navigate(`/dashboard/quizzes/${topic}/${subtopic}/feedback`, { state: { selectedAnswers, questions } });
    }, 1000);
  };

  // Format time left in minutes and seconds
  const formatTimeLeft = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`; 
  };

  // Function to handle submit confirmation
  const handleSubmitClick = () => {
    setShowConfirmation(true);
  };

  const confirmSubmit = () => {
    setShowConfirmation(false);
    submitQuiz();
  };

  const cancelSubmit = () => {
    setShowConfirmation(false);
  };

  if (loading) {
    return (
      <div className="quiz-questions-container">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="quiz-questions-container">
      <h1>{topic} - {subtopic}</h1>
      <p className={`time-remaining ${timeLeft <= 60 ? 'warning' : ''}`}>Time Remaining: {formatTimeLeft(timeLeft)}</p>

      {!submitted ? (
        <>
          <div className="question-section">
            <h3>{questions[currentIndex]?.question}</h3>
            <div className="options">
              {questions[currentIndex]?.options.map((option, idx) => (
                <button
                  key={idx}
                  className={`option-button ${selectedAnswers[currentIndex] === idx ? 'selected' : ''}`}
                  onClick={() => handleAnswerSelection(idx)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="navigation-buttons">
            <button onClick={() => setCurrentIndex(0)} disabled={currentIndex === 0}>{"<<"}</button>
            <button onClick={() => setCurrentIndex(prev => Math.max(prev - 1, 0))} disabled={currentIndex === 0}>{"<"}</button>
            <button onClick={() => setCurrentIndex(prev => Math.min(prev + 1, questions.length - 1))} disabled={currentIndex === questions.length - 1}>{">"}</button>
            <button onClick={() => setCurrentIndex(questions.length - 1)} disabled={currentIndex === questions.length - 1}>{">>"}</button>
          </div>

          <button onClick={handleSubmitClick} className="submit-button">Submit</button>

          {/* Confirmation dialog */}
          {showConfirmation && (
            <div className="confirmation-dialog">
              <div className="dialog-content">
                <p>Are you sure you want to submit?</p>
                <div className="dialog-buttons">
                  <button onClick={confirmSubmit}>Yes</button>
                  <button onClick={cancelSubmit}>No</button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <p>Submitting quiz...</p>
      )}
    </div>
  );
};

export default QuizQuestions;
