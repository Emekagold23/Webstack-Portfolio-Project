import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Quizzes.css'; // Import CSS

const Quiz = () => {
  const [activeTopic, setActiveTopic] = useState(null);

  const quizTopics = [
    {
      topic: 'Technology',
      subtopics: ['Programming', 'Networking', 'AI & Machine Learning'],
    },
    {
      topic: 'Mathematics',
      subtopics: ['Algebra', 'Calculus', 'Statistics'],
    },
    {
      topic: 'Literature',
      subtopics: ['Classic Novels', 'Poetry', 'Drama'],
    },
    {
      topic: 'Geography',
      subtopics: ['Physical Geography', 'Human Geography', 'Cartography'],
    },
  ];

  const handleTopicClick = (topic) => {
    setActiveTopic(activeTopic === topic ? null : topic);
  };

  return (
    <div className="quizzes-container">
      <h1>Quiz Topics</h1>
      <div className="topics-grid">
        {quizTopics.map((topicData) => (
          <div key={topicData.topic} className="topic-box">
            <div
              className="topic-header"
              onClick={() => handleTopicClick(topicData.topic)}
            >
              {topicData.topic}
            </div>
            {activeTopic === topicData.topic && (
              <div className="subtopics">
                {topicData.subtopics.map((subtopic) => (
                  <Link
                    key={subtopic}
                    to={`/dashboard/quizzes/${topicData.topic}/${subtopic}/start`}
                    className="subtopic-box"
                  >
                    {subtopic}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
