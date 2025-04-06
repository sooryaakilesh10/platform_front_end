import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import LessonView from './pages/LessonView';
import Profile from './pages/Profile';
import Tests from './pages/Tests';
import TestInterface from './pages/TestInterface';
import Calendar from './pages/Calendar';
import Certificates from './pages/Certificates';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/lesson/*"
          element={<LessonView />}
        />
        <Route
          path="/test/:id"
          element={<TestInterface />}
        />
        <Route
          path="*"
          element={
            <div className="flex min-h-screen bg-gray-50">
              <Sidebar />
              <div className="flex-1">
                <Header userName="Alex" />
                <main>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/tests" element={<Tests />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/certificates" element={<Certificates />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </main>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;