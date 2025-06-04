import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faCalendar, faPlus, faInfoCircle, faCog, faHome, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './settings.css';
import { useAuth } from '../contexts/AuthContext';

const TOPBAR_HEIGHT = 60;

const Sidebar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    if (isMobile) {
      setShowOverlay(!isCollapsed);
    }
    // Add smooth transition
    document.body.style.overflow = isCollapsed ? 'hidden' : '';
  };

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    window.location.hash = href;
  };

  const renderNavigation = () => {
    const navigationItems = [
      { id: 'dashboard', label: 'Dashboard', icon: faHome },
      { id: 'events', label: 'Events', icon: faCalendar },
      ...(user.role === 'admin' ? [{ id: 'add-event', label: 'Add Event', icon: faPlus }] : []),
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
    <>
      {isMobile && showOverlay && (
        <div
          style={styles.overlay}
          onClick={(e) => {
            e.stopPropagation();
            toggleSidebar();
          }}
          role="button"
          aria-label="Close sidebar"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              toggleSidebar();
            }
          }}
        />
      )}
      <div
        style={{
          ...styles.sidebar,
          top: TOPBAR_HEIGHT,
          height: `calc(100vh - ${TOPBAR_HEIGHT}px)`,
          left: isCollapsed ? '-250px' : 0,
          width: isCollapsed ? '60px' : '250px',
          marginTop: 0,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 1000,
          position: 'fixed'
        }}
        role="navigation"
      >
        <div style={styles.header}>
          <h2 style={styles.title}>CPESS Event Planner</h2>
          <button
            style={{
              ...styles.toggleButton,
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '4px',
              transition: 'background-color 0.2s ease'
            }}
            onClick={toggleSidebar}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <FontAwesomeIcon 
              icon={isCollapsed ? faChevronRight : faChevronLeft} 
              style={{ 
                width: '16px',
                height: '16px',
                color: 'var(--text-primary)',
                transition: 'transform 0.2s ease'
              }}
            />
          </button>
        </div>
        {renderNavigation()}
      </div>
      {isCollapsed && (
        <button
          style={styles.expandButton}
          onClick={toggleSidebar}
          aria-label="Expand sidebar"
        >
          <FontAwesomeIcon 
            icon={faChevronLeft} 
            style={{ 
              width: '16px', 
              height: '16px',
              color: 'var(--text-primary)' 
            }} 
          />
        </button>
      )}
    </>
  );
};

Sidebar.propTypes = {
  // Add any props here if needed
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    cursor: 'pointer'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 60px)',
    backgroundColor: 'var(--background-color)',
    marginTop: '60px',
    '@media (min-width: 768px)': {
      height: '100vh',
      marginTop: 0,
    }
  },
  sidebar: {
    position: 'fixed',
    top: '60px',
    left: 0,
    width: '250px',
    backgroundColor: 'var(--secondary-bg)',
    color: 'var(--text-primary)',
    padding: '15px',
    boxSizing: 'border-box',
    zIndex: 1050,
    overflowY: 'auto',
    boxShadow: '2px 0 5px rgba(0,0,0,0.2)',
    '@media (max-width: 768px)': {
      width: '200px',
      padding: '10px',
    }
  },
  expandButton: {
    position: 'fixed',
    top: '60px',
    left: '240px',
    backgroundColor: 'var(--secondary-bg)',
    border: '1px solid var(--border-color)',
    padding: '8px',
    borderRadius: '6px',
    cursor: 'pointer',
    boxShadow: '2px 0 5px rgba(0,0,0,0.2)',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1050,
    transition: 'all 0.2s ease',
    '@media (max-width: 768px)': {
      left: '190px',
    },
    '&:hover': {
      backgroundColor: 'var(--border-color)',
      transform: 'scale(1.05)',
    },
    '&:active': {
      transform: 'scale(0.95)',
    }
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    '@media (max-width: 768px)': {
      marginBottom: '12px',
    }
  },
  toggleButton: {
    backgroundColor: 'var(--secondary-bg)',
    border: '1px solid var(--border-color)',
    padding: '8px',
    cursor: 'pointer',
    borderRadius: '6px',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'var(--border-color)',
      transform: 'scale(1.05)',
    },
    '&:active': {
      transform: 'scale(0.95)',
    }
  },
  title: {
    marginTop: 0,
    marginBottom: '15px',
    color: 'var(--text-primary)',
    fontSize: '1.3rem',
    fontWeight: 'bold',
    textAlign: 'center',
    borderBottom: '2px solid var(--border-color)',
    '@media (max-width: 768px)': {
      marginBottom: '12px',
      fontSize: '1.2rem',
    }
  },
  navLinks: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  link: {
    display: 'block',
    padding: '10px 0',
    color: 'var(--text-primary)',
    textDecoration: 'none',
    fontWeight: '600',
    borderBottom: '1px solid var(--border-color)',
    transition: 'all 0.2s ease',
    '@media (max-width: 768px)': {
      padding: '8px 0',
    },
    '&:hover': {
      color: 'var(--text-highlight)',
      backgroundColor: 'var(--border-color)',
      transform: 'translateX(5px)',
    }
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
    '@media (min-width: 768px)': {
      display: 'none',
    }
  }
};

export default Sidebar;
