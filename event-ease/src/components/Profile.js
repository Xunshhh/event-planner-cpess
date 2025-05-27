import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    program: user.program || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Update user data in localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map(user => 
        user.studentId === formData.studentId ? {
          ...user,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          program: formData.program
        } : user
      );
      
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      // Update current user state
      const updatedUser = {
        ...user,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        program: formData.program
      };
      
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      toast.success('Profile updated successfully!');
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>My Profile</h2>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="profile-content">
        <div className="profile-info">
          <h3>Personal Information</h3>
          <div className="profile-section">
            <label>Student ID:</label>
            <p>{user.username}</p>
          </div>

          <div className="profile-section">
            <label>Full Name:</label>
            <p>{user.firstName} {user.lastName}</p>
          </div>

          <div className="profile-section">
            <label>Email:</label>
            <p>{user.email}</p>
          </div>

          <div className="profile-section">
            <label>Program:</label>
            <p>{user.program}</p>
          </div>

          <div className="profile-actions">
            <button onClick={() => setEditMode(!editMode)}>
              {editMode ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {editMode && (
          <form onSubmit={handleSubmit} className="profile-edit-form">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Program</label>
              <input
                type="text"
                name="program"
                value={formData.program}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="save-button">
                Save Changes
              </button>
              <button type="button" onClick={() => setEditMode(false)} className="cancel-button">
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
