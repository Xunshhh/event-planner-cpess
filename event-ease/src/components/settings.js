import React, { useState, useEffect } from 'react';
import './settings.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Settings = () => {
  const [settings, setSettings] = useState(() => {
    // Get theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Get other settings from localStorage
    const savedSettings = JSON.parse(localStorage.getItem('settings')) || {
      theme: savedTheme,
      language: 'en'
    };
    
    // Apply theme immediately
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.body.className = savedTheme === 'dark' ? 'dark-theme' : 'light-theme';
    
    return savedSettings;
  });

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setSettings(prev => ({
      ...prev,
      theme: newTheme
    }));
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleLanguageChange = (e) => {
    setSettings(prev => ({
      ...prev,
      language: e.target.value
    }));
  };

  const saveSettings = () => {
    // Save theme to localStorage
    localStorage.setItem('theme', settings.theme);
    
    // Save all other settings
    localStorage.setItem('settings', JSON.stringify(settings));
    
    // Apply theme immediately
    document.documentElement.setAttribute('data-theme', settings.theme);
    
    // Update body class for theme
    document.body.className = settings.theme === 'dark' ? 'dark-theme' : 'light-theme';
    
    // Show success message
    alert('Settings saved successfully!');
  };

  return (
    <div style={styles.container} className={settings.theme === 'dark' ? 'dark-theme' : 'light-theme'}>
      <div style={styles.header}>
        <FontAwesomeIcon icon={faCog} style={styles.icon} />
        <h1>Settings</h1>
      </div>
      
      <div style={styles.settingsSection}>
        <h2>General Settings</h2>
        <div style={styles.settingItem}>
          <label>Theme:</label>
          <select style={styles.select} value={settings.theme} onChange={handleThemeChange}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        
        <div style={styles.settingItem}>
          <label>Language:</label>
          <select style={styles.select} value={settings.language} onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
      </div>





      <button style={styles.saveButton} onClick={saveSettings}>
        Save Changes
      </button>
    </div>
  );
};

Settings.propTypes = {
  // Add any props here if needed
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: 'var(--background-color)',
    minHeight: 'calc(100vh - 60px)',
    color: 'var(--text-primary)',
    marginTop: '60px',
    '@media (min-width: 768px)': {
      padding: '40px',
      marginTop: 0,
    }
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '30px',
  },
  icon: {
    marginRight: '10px',
    fontSize: '24px',
  },
  settingsSection: {
    flex: '0 1 400px',
    backgroundColor: 'var(--secondary-bg)',
    padding: '15px',
    borderRadius: '12px',
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.07)',
    '@media (min-width: 768px)': {
      flex: '0 1 450px',
      padding: '20px',
    }
  },
  settingItem: {
    marginBottom: '15px',
  },
  select: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid var(--border-color)',
    width: '200px',
  },
  checkbox: {
    margin: '0 10px',
  },
  saveButton: {
    padding: '0.65rem 1.2rem',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: 'var(--text-highlight)',
    color: 'var(--background-color)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '@media (min-width: 768px)': {
      padding: '0.75rem 1.5rem',
    }
  },
};

export default Settings;
