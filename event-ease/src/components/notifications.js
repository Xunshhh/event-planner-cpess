import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faTimes } from '@fortawesome/free-solid-svg-icons';
import './notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const savedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    setNotifications(savedNotifications);
    setUnreadCount(savedNotifications.filter(n => !n.read).length);
  }, []);

  const markAsRead = (id) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    setUnreadCount(prev => prev - 1);
  };

  const removeNotification = (id) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    if (!notifications.find(n => n.id === id).read) {
      setUnreadCount(prev => prev - 1);
    }
  };

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <div className="notifications-title">
          <FontAwesomeIcon icon={faBell} />
          <span>Notifications</span>
          {unreadCount > 0 && (
            <span className="unread-count">{unreadCount}</span>
          )}
        </div>
        <button 
          className="clear-all-btn"
          onClick={() => {
            setNotifications([]);
            localStorage.setItem('notifications', JSON.stringify([]));
            setUnreadCount(0);
          }}
        >
          Clear All
        </button>
      </div>
      <div className="notifications-list">
        {notifications.map((notification) => (
          <div 
            key={notification.id}
            className={`notification-item ${notification.read ? 'read' : 'unread'}`}
          >
            <div className="notification-content">
              <div className="notification-header">
                <span className="notification-title">{notification.title}</span>
                <span className="notification-timestamp">
                  {new Date(notification.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div className="notification-message">
                {notification.message}
              </div>
            </div>
            <div className="notification-actions">
              <button 
                className="mark-read-btn"
                onClick={() => markAsRead(notification.id)}
              >
                Mark as Read
              </button>
              <button 
                className="remove-btn"
                onClick={() => removeNotification(notification.id)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Notifications.propTypes = {
  // Add any props here if needed
};

export default Notifications;
