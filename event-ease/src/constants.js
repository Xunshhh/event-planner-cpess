// UI Constants
export const TOPBAR_HEIGHT = 60; // in pixels

// Color Constants
export const PRIMARY_COLOR = '#003366';
export const SECONDARY_COLOR = '#666';
export const ERROR_COLOR = '#dc3545';
export const SUCCESS_COLOR = '#28a745';

// API Constants
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Authentication Constants
export const LOGIN_PATH = '/login';
export const REGISTER_PATH = '/register';
export const PROFILE_PATH = '/profile';

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning'
};
