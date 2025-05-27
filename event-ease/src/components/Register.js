import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../contexts/AuthContext';
import './register.css';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    studentId: '',
    firstName: '',
    lastName: '',
    program: ''
  });
  const [error, setError] = useState(''); // Keep this for form validation errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Form validation
    if (!validateForm()) {
      return;
    }

    try {
      // Get existing users or create new array
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if user already exists
      const existingStudent = existingUsers.find(user => user.studentId.toLowerCase() === formData.studentId.toLowerCase());
      const existingEmail = existingUsers.find(user => user.email.toLowerCase() === formData.email.toLowerCase());
      
      if (existingStudent) {
        throw new Error('This student ID is already registered. Please try another one.');
      }

      if (existingEmail) {
        throw new Error('This email is already registered. Please try another one.');
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        studentId: formData.studentId,
        password: formData.password,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        program: formData.program,
        role: 'student',
        createdAt: new Date().toISOString()
      };

      // Add new user to existing users
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      // Log in the user
      await login(newUser.studentId, formData.password);
      
      // Show success message and redirect
      toast.success('Registration successful! Welcome to EventEase!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Registration failed. Please try again.', {
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

  const validateForm = () => {
    if (!formData.email) {
      setError('Email is required');
      return false;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!formData.studentId) {
      setError('Student ID is required');
      return false;
    }

    if (!formData.password || formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (!formData.firstName || !formData.lastName) {
      setError('First name and last name are required');
      return false;
    }

    if (!formData.program) {
      setError('Program is required');
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Student Registration</h2>

        
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="studentId">Student ID</label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              required
              placeholder="Enter your student ID"
            />
          </div>

          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="Enter your first name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Enter your last name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="program">Program</label>
            <select
              id="program"
              name="program"
              value={formData.program}
              onChange={handleChange}
              required
            >
              <option value="">Select your program</option>
              <option value="bsit">BS Information Technology</option>
              <option value="bsece">BS Electrical and Computer Engineering</option>
              <option value="bsie">BS Industrial Engineering</option>
              <option value="bsme">BS Mechanical Engineering</option>
              <option value="bsce">BS Civil Engineering</option>
              <option value="bsmech">BS Mechanical Engineering</option>
              <option value="bsche">BS Chemical Engineering</option>
              <option value="bsarch">BS Architecture</option>
              <option value="bscpe">BS Computer Engineering</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
            />
          </div>

          <button type="submit" className="register-button">
            Register
          </button>

          <div className="login-link">
            Already have an account? <a href="/login">Login here</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
