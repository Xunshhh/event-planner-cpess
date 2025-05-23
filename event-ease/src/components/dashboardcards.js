import React from 'react';
import { FaMicrochip, FaCalendarAlt, FaUserGraduate, FaLaptopCode } from 'react-icons/fa';

const iconMap = {
  'events': <FaCalendarAlt size={40} />,
  'students': <FaUserGraduate size={40} />,
  'projects': <FaLaptopCode size={40} />,
  'cpe': <FaMicrochip size={40} />,
};

const DashboardCard = ({ title, value, type, bgColor }) => {
  return (
    <div style={{ ...styles.card, backgroundColor: bgColor || '#f8f9fa' }}>
      <div style={styles.icon}>{iconMap[type]}</div>
      <div>
        <h2 style={styles.value}>{value}</h2>
        <p style={styles.title}>{title}</p>
      </div>
    </div>
  );
};

const styles = {
  card: {
    flex: '1 1 220px',
    display: 'flex',
    alignItems: 'center',
    gap: 15,
    padding: '20px',
    borderRadius: '15px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    color: '#333',
    background: 'white',
    transition: '0.3s ease',
  },
  icon: {
    color: '#007bff',
  },
  value: {
    fontSize: '2rem',
    margin: 0,
    fontWeight: 'bold',
  },
  title: {
    margin: 0,
    fontSize: '1rem',
    color: '#555',
  },
};

export default DashboardCard;
