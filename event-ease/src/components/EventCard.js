import React from 'react';
import { FaCalendarCheck, FaCalendarTimes } from 'react-icons/fa';

const EventCard = ({ title, date, registered }) => {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.iconWrapper}>
          {registered ? (
            <FaCalendarCheck style={{ color: '#2ecc71', fontSize: '1.5rem' }} />
          ) : (
            <FaCalendarTimes style={{ color: '#e74c3c', fontSize: '1.5rem' }} />
          )}
        </div>
        <h3 style={styles.title}>{title}</h3>
      </div>
      <div style={styles.content}>
        <p style={styles.date}><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
        <p style={styles.statusText}>
          Status: <span style={{ color: registered ? '#2ecc71' : '#e74c3c', fontWeight: 'bold' }}>
            {registered ? 'Registered' : 'Not Registered'}
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: 'linear-gradient(145deg, #e6f0ff, #ffffff)',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
    cursor: 'pointer',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '10px',
  },
  iconWrapper: {
    backgroundColor: '#f0f4ff',
    borderRadius: '50%',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#003366',
  },
  content: {
    marginTop: '10px',
    color: '#555',
  },
  date: {
    marginBottom: '6px',
  },
  statusText: {
    fontSize: '0.95rem',
  },
};

export default EventCard;
