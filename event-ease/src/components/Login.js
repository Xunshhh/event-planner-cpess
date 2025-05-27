import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../contexts/AuthContext';
import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Check credentials
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.studentId.toLowerCase() === username.toLowerCase());

    if (user && user.password === password) {
      login(username, password, 'student');
      navigate('/dashboard');
    } else if (!user) {
      toast.error('Student ID not found. Please check your ID or register first.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    } else {
      toast.error('Incorrect password. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>EventEase Login</h2>
        <form onSubmit={handleSubmit} className="login-form">

          
          <div className="form-group">
            <label htmlFor="studentId">Student ID</label>
            <input
              type="text"
              id="studentId"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your student ID"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>



          <div className="form-group">


          </div>

          <button type="submit" className="login-button">
            Login
          </button>

          <div className="register-link">
            Don't have an account? <Link to="/register">Register here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
