import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, Navigate, Outlet } from 'react-router-dom';

import LandingPage from './pages/LandingPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import MyDocsPage from './pages/MyDocsPage.jsx';
import HowItWorksPage from './pages/HowItWorksPage.jsx';


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
        {/* Public Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Docs Route */}
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        
        {/* Auth Route */}
        <Route 
          path="/auth" 
          element={
            isAuthenticated ? <Navigate to="/myDocs" /> : <AuthPage onLogin={handleLogin} />
          } 
        />

        {/* myDocs Route */}
        <Route 
          path="/myDocs"
          element={
            isAuthenticated ? <MyDocsPage onLogout={handleLogout} /> : <Navigate to="/auth" />
          }
        />
        
        {/* Catch-all for logged-in users */}
        {isAuthenticated && <Route path="*" element={<Navigate to="/myDocs" />} />}
        
        {/* Catch-all for logged-out users */}
        {!isAuthenticated && <Route path="*" element={<Navigate to="/" />} />}
      </Routes>
    </HashRouter>
  );
}

export default App;