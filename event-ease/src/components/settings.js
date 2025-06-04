import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './settings.css';

const Settings = ({ showNotifications, setShowNotifications }) => {
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState(() => {
    // Get theme preference based on user role
    const key = user.role === 'admin' ? 'adminTheme' : 'studentTheme';
    return localStorage.getItem(key) || 'light';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Save theme preference based on user role
    const key = user.role === 'admin' ? 'adminTheme' : 'studentTheme';
    localStorage.setItem(key, newTheme);
    
    // Update document theme
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="settings-container">
      <div className="settingsSection">
        <h2>Settings</h2>
        
        <div className="settingItem">
          <h3>Theme</h3>
          <div className="theme-toggle">
            <label>
              <input
                type="checkbox"
                checked={theme === 'dark'}
                onChange={toggleTheme}
                className="checkbox"
              />
              Dark Mode
            </label>
          </div>
          <p className="text-secondary theme-note">
            {user.role === 'admin' ? 'Admin Theme Preference' : 'Student Theme Preference'}
          </p>
        </div>

        <div className="settingItem">
          <h3>User Information</h3>
          <p className="text-secondary">Email: {user?.email}</p>
        </div>

        <div className="settingItem">
          <h3>Notifications</h3>
          <div className="notifications-toggle">
            <label>
              <input
                type="checkbox"
                checked={showNotifications}
                onChange={(e) => setShowNotifications(e.target.checked)}
                className="checkbox"
              />
              Enable Notifications
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;