import React from 'react';
import { FaMicrochip, FaCalendarAlt, FaUserGraduate, FaLaptopCode } from 'react-icons/fa';

const iconMap = {
  'events': <FaCalendarAlt />,
  'students': <FaUserGraduate />,
  'projects': <FaLaptopCode />,
  'cpe': <FaMicrochip />,
};

const DashboardCard = ({ title, value, type, bgColor }) => {
  return (
    <div style={{ ...styles.card, background: bgColor || 'linear-gradient(135deg, #e0f7ff, #ffffff)' }}>
      <div style={styles.iconCircle}>
        <span style={styles.icon}>{iconMap[type]}</span>
      </div>
      <div>
        <h2 style={styles.value}>{value}</h2>
        <p style={styles.title}>{title}</p>
      </div>
    </div>
  );
};

const styles = {
  card: {
    flex: '1 1 240px',
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    padding: '20px 25px',
    borderRadius: '20px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
    color: '#003366',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  },
  iconCircle: {
    backgroundColor: '#e6f0ff',
    borderRadius: '50%',
    padding: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  icon: {
    fontSize: '1.8rem',
    color: '#007bff',
  },
  value: {
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: 0,
    color: '#003366',
  },
  title: {
    margin: 0,
    fontSize: '1rem',
    color: '#555',
  },
};

export default DashboardCard;
