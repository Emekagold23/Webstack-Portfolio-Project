import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Quizzes from './pages/Quizzes'; // Correct import for quiz topics
import QuizStart from './pages/QuizStart';
import QuizQuestions from './pages/QuizQuestions';
import QuizFeedback from './pages/QuizFeedback';
import Subtopic from './pages/Subtopic'; // Correct import for subtopics

const App = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<Home />} />
    <Route path="/signup" element={<Signup />} />

    {/* Protected Routes */}
    <Route path="/dashboard" element={<Dashboard />}>
      <Route path="profile" element={<Profile />} />
      <Route path="settings" element={<Settings />} />
      <Route path="quizzes" element={<Quizzes />} />  {/* List of quiz topics */}
      <Route path="quizzes/:topic" element={<Subtopic />} />  {/* Specific topic */}
      <Route path="quizzes/:topic/:subtopic/start" element={<QuizStart />} /> {/* Start quiz */}
      <Route path="quizzes/:topic/:subtopic/questions" element={<QuizQuestions />} /> {/* Quiz questions */}
      <Route path="quizzes/:topic/:subtopic/feedback" element={<QuizFeedback />} /> {/* Quiz feedback */}
    </Route>
  </Routes>
);

export default App;
