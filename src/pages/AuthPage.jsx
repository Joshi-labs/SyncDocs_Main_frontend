import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, LogIn, Lock, AlertTriangle, Loader2 } from 'lucide-react';


//const BACKEND_URL = 'http://localhost:5001';
const BACKEND_URL = 'https://aws.vpjoshi.in/syncdocs';
const PROJECT_ID = "SyncDocs";


const AuthInput = ({ id, type, placeholder, icon, value, onChange }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      {icon}
    </div>
    <input
      id={id}
      name={id}
      type={type}
      placeholder={placeholder}
      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
      value={value}
      onChange={onChange}
    />
  </div>
);

const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const endpoint = isLogin ? '/signin' : '/signup';
    const url = `${BACKEND_URL}${endpoint}`; 
    
    const body = {
      email: formData.email,
      password: formData.password,
      projectId: PROJECT_ID 
    };
    
    if (!isLogin) {
      body.fullName = formData.fullName;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred.');
      }

      onLogin(data.token);
      navigate('/myDocs');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 antialiased">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <Link to="/" className="text-4xl font-bold text-blue-600">
            SyncDocs
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => { setIsLogin(true); setError(null); }}
              className={`flex-1 py-3 text-lg font-medium text-center ${
                isLogin
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              } transition-all`}
            >
              Login
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(null); }}
              className={`flex-1 py-3 text-lg font-medium text-center ${
                !isLogin
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              } transition-all`}
            >
              Sign Up
            </button>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            {isLogin ? 'Welcome Back!' : 'Create Your Account'}
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-3" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {!isLogin && (
              <AuthInput
                id="fullName"
                type="text"
                placeholder="Your Name"
                icon={<Users className="w-5 h-5 text-gray-400" />}
                value={formData.fullName}
                onChange={handleChange}
              />
            )}
            <AuthInput
              id="email"
              type="email"
              placeholder="Email Address"
              icon={<LogIn className="w-5 h-5 text-gray-400" />}
              value={formData.email}
              onChange={handleChange}
            />
            <AuthInput
              id="password"
              type="password"
              placeholder="Password"
              icon={<Lock className="w-5 h-5 text-gray-400" />}
              value={formData.password}
              onChange={handleChange}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md flex items-center justify-center disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                isLogin ? 'Login' : 'Create Account'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
