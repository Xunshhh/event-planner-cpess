import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faUserCircle, faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/AuthContext';
import { PRIMARY_COLOR, SECONDARY_COLOR, ERROR_COLOR, SUCCESS_COLOR, TOPBAR_HEIGHT } from '../constants';

const styles = {
  navbar: {
    height: `${TOPBAR_HEIGHT}px`,
    backgroundColor: PRIMARY_COLOR,
    display: 'flex',
    alignItems: 'center',
    padding: '0 2rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  logoImage: {
    height: '40px',
    width: 'auto'
  },
  logoText: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: 'white',
    margin: 0
  },
  navActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    marginLeft: 'auto'
  },
  link: {
    color: 'rgba(255, 255, 255, 0.85)',
    textDecoration: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: '8px 12px',
    borderRadius: '4px',
    transition: 'background-color 0.2s, color 0.2s',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: 'white'
    }
  },
  notificationsBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem',
    position: 'relative',
    color: 'rgba(255, 255, 255, 0.85)'
  },
  notificationsBadge: {
    position: 'absolute',
    top: '0',
    right: '0',
    transform: 'translate(50%, -50%)',
    backgroundColor: ERROR_COLOR,
    color: 'white',
    borderRadius: '50%',
    padding: '0.25rem 0.5rem',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    minWidth: '20px',
    textAlign: 'center'
  },
  userContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  userName: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: '0.9rem',
    fontWeight: 500
  },
  logoutButton: {
    backgroundColor: ERROR_COLOR,
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: '#c82333'
    }
  }
};

const TopBar = ({ showNotifications, setShowNotifications }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  // Get unread notifications count
  const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
  const events = JSON.parse(localStorage.getItem('events') || '[]');
  const hasEvents = events.length > 0;
  const unreadCount = hasEvents ? notifications.filter(n => !n.read).length : 0;

  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        <img src={require('../assets/ub-logo.png')} alt="University of Batangas Logo" style={styles.logoImage} />
        <div>
          <h1 style={styles.logoText}>EventEase Management System</h1>
        </div>
      </div>

      <div style={styles.navActions}>
        <Link to="/calendar" style={styles.link}>
          <FontAwesomeIcon icon={faCalendar} size="lg" />
        </Link>
        <Link to="/profile" style={styles.link}>
          <FontAwesomeIcon icon={faUserCircle} size="lg" />
        </Link>
        <button 
          style={styles.notificationsBtn}
          onClick={() => setShowNotifications(!showNotifications)}
          aria-label="Toggle notifications"
        >
          <FontAwesomeIcon icon={faBell} size="lg" />
          {unreadCount > 0 && (
            <span style={styles.notificationsBadge}>{unreadCount}</span>
          )}
        </button>
        <div style={styles.userContainer}>
          <span style={styles.userName}>{user.role === 'admin' ? 'Admin' : 'Student'}</span>
          <button
            style={styles.logoutButton}
            onClick={() => {
              logout();
              navigate('/login');
            }}
            aria-label="Logout"
          >
            <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
