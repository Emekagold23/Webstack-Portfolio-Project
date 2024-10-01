import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './Subtopic.css';

const Subtopic = () => {
  const { topic } = useParams(); // Get the topic from URL parameters

  // Mapping of subtopics to display
  const subtopics = {
    Technology: ['Programming', 'Networking', 'AI & Machine Learning'],
    Mathematics: ['Algebra', 'Calculus', 'Statistics'],
    Literature: ['Classic Novels', 'Poetry', 'Drama'],
    Geography: ['Physical Geography', 'Human Geography', 'Cartography'],
  };

  return (
    <div className="subtopic-container">
      <h1>{topic} Subtopics</h1>
      <div className="subtopics-list">
        {subtopics[topic]?.map((subtopic) => (
          <div key={subtopic} className="subtopic-box">
            <Link to={`/dashboard/quizzes/${topic}/${subtopic}/start`} className="subtopic-link">
              {subtopic}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subtopic;
