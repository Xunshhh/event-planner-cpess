import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Load notifications from localStorage
    const savedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    setNotifications(savedNotifications);
  }, []);

  const addNotification = (notification) => {
    const newNotification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };

    const updatedNotifications = [newNotification, ...notifications];
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));

    // Show notifications panel when new notification arrives
    setShowNotifications(true);
  };

  const markAsRead = (id) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const removeNotification = (id) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    localStorage.removeItem('notifications');
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <NotificationsContext.Provider 
      value={{ 
        notifications, 
        showNotifications,
        addNotification,
        markAsRead,
        removeNotification,
        clearAllNotifications,
        toggleNotifications
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  return useContext(NotificationsContext);
};

export default NotificationsContext;
