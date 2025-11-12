import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, Navigate, Outlet } from 'react-router-dom';

// --- Page Imports ---
import LandingPage from './pages/LandingPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import MyDocsPage from './pages/MyDocsPage.jsx';
import HowItWorksPage from './pages/HowItWorksPage.jsx';
import DocumentEditorPage from './pages/DocumentEditorPage.jsx'; // <-- Already here

// --- Helper ---
const getAuthToken = () => localStorage.getItem('token');

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getAuthToken());

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <HashRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        
        {/* Auth Route */}
        <Route 
          path="/auth" 
          element={
            isAuthenticated ? <Navigate to="/myDocs" /> : <AuthPage onLogin={handleLogin} />
          } 
        />

        {/* Protected Routes */}
        <Route 
          path="/myDocs"
          element={
            isAuthenticated ? <MyDocsPage onLogout={handleLogout} /> : <Navigate to="/auth" />
          }
        />
        
        <Route 
          path="/doc/:id"
          element={
            isAuthenticated ? <DocumentEditorPage onLogout={handleLogout} /> : <Navigate to="/auth" />
          }
        />

        <Route path="/shared/:id" element={<DocumentEditorPage onLogout={handleLogout} />}/>
        
        {/* Catch-alls */}
        {isAuthenticated && <Route path="*" element={<Navigate to="/myDocs" />} />}
        {!isAuthenticated && <Route path="*" element={<Navigate to="/" />} />}
      </Routes>
    </HashRouter>
  );
}

export default App;