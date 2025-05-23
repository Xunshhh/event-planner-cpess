import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/ub-logo.png'; // Make sure to add your logo here

const TopBar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        <img src={logo} alt="University of Batangas Logo" style={styles.logoImage} />
        <div>
          <h1 style={styles.logoText}>University of Batangas</h1>
          <p style={styles.subtext}>CPESS Event Planner</p>
        </div>
      </div>
      <ul style={styles.navLinks}>
        <li><Link to="/dashboard" style={styles.link}>Dashboard</Link></li>
        <li><Link to="/events" style={styles.link}>Events</Link></li>
        <li><Link to="/add-event" style={styles.link}>Add Event</Link></li>
        <li><Link to="/about" style={styles.link}>About</Link></li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#003366',
    padding: '10px 30px',
    color: 'white',
    fontFamily: 'Segoe UI, sans-serif',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  logoImage: {
    width: '50px',
    height: '50px',
    objectFit: 'contain',
  },
  logoText: {
    margin: 0,
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtext: {
    margin: 0,
    fontSize: '0.85rem',
    color: '#cce0ff',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '25px',
    margin: 0,
    padding: 0,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500',
    transition: '0.3s',
  },
  linkHover: {
    color: '#66ccff',
  },
};

export default TopBar;
