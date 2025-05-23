import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faCalendar, faPlus, faInfoCircle, faCog } from '@fortawesome/free-solid-svg-icons';

const TOPBAR_HEIGHT = 60;

const Sidebar = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    window.location.hash = href;
  };

  const renderNavigation = () => {
    const navigationItems = [
      { id: 'events', label: 'Events', icon: faCalendar },
      { id: 'add-event', label: 'Add Event', icon: faPlus },
      { id: 'about', label: 'About', icon: faInfoCircle },
      { id: 'settings', label: 'Settings', icon: faCog }
    ];

    return (
      <ul style={styles.navLinks} role="navigation">
        {navigationItems.map((item) => (
          <li key={item.id}>
            <Link
              to={`/${item.id}`}
              style={styles.link}
              aria-label={`Navigate to ${item.label}`}
            >
              <FontAwesomeIcon icon={item.icon} style={{ marginRight: '8px', width: '16px', height: '16px' }} />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  if (!isMounted) return null;

  return (
    <div
      style={{
        ...styles.sidebar,
        top: TOPBAR_HEIGHT + 5,
        height: `calc(100vh - ${TOPBAR_HEIGHT + 5}px)`,
        left: 0,
        marginTop: '5px'
      }}
      role="navigation"
    >
      <h2 style={styles.title}>UB Event Planner</h2>
      {renderNavigation()}
    </div>
  );
};

Sidebar.propTypes = {
  // Add any props here if needed
};

const styles = {
  toggleButton: {
    position: 'fixed',
    left: 15,
    zIndex: 1100,
    fontSize: 24,
    backgroundColor: '#1a237e',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    padding: '8px 12px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  sidebar: {
    position: 'fixed',
    width: 250,
    backgroundColor: '#263238',
    color: '#fff',
    padding: 20,
    boxSizing: 'border-box',
    transition: 'left 0.3s ease',
    zIndex: 1050,
    overflowY: 'auto',
    boxShadow: '2px 0 5px rgba(0,0,0,0.2)',
  },
  title: {
    marginTop: 0,
    marginBottom: 20,
    fontFamily: 'Arial, sans-serif',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    borderBottom: '2px solid #37474f',
  },
  navLinks: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  link: {
    display: 'block',
    padding: '12px 0',
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '600',
    borderBottom: '1px solid #37474f',
    transition: 'all 0.2s ease',
    '&:hover': {
      color: '#03a9f4',
      backgroundColor: '#37474f',
      transform: 'translateX(5px)',
    },
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1040,
    cursor: 'pointer',
  },
};

export default Sidebar;
