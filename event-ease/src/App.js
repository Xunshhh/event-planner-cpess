import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopBar from './components/topbar';
import Sidebar from './components/sidebar';
import DashboardCard from './components/DashBoardCard';
import MainDashboard from './components/maindashboard';
import Event from './components/event';
import AddEvent from './components/AddEvent';
import Notifications from './components/notifications';
import Settings from './components/settings';
import About from './components/about';
import Calendar from './components/Calendar';
import Login from './components/Login';
import AdminLogin from './components/AdminLogin';
import Register from './components/Register';
import Profile from './components/Profile';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function App() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <ProtectedRoute
                  showNotifications={showNotifications}
                  setShowNotifications={setShowNotifications}
                >
                  <MainDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/profile" element={
              <ProtectedRoute
                showNotifications={showNotifications}
                setShowNotifications={setShowNotifications}
              >
                <Profile />
              </ProtectedRoute>
            } />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute
                  showNotifications={showNotifications}
                  setShowNotifications={setShowNotifications}
                >
                  <MainDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/events"
              element={
                <ProtectedRoute
                  showNotifications={showNotifications}
                  setShowNotifications={setShowNotifications}
                >
                  <Event />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-event"
              element={
                <ProtectedRoute
                  adminOnly
                  showNotifications={showNotifications}
                  setShowNotifications={setShowNotifications}
                >
                  <AddEvent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/calendar"
              element={
                <ProtectedRoute
                  showNotifications={showNotifications}
                  setShowNotifications={setShowNotifications}
                >
                  <Calendar />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute
                  showNotifications={showNotifications}
                  setShowNotifications={setShowNotifications}
                >
                  <About />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute
                  adminOnly
                  showNotifications={showNotifications}
                  setShowNotifications={setShowNotifications}
                >
                  <Settings />
                </ProtectedRoute>
              }
            />
          </Routes>
          {showNotifications && <Notifications />}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </>
      </Router>
    </AuthProvider>
  );
}

const ProtectedRoute = ({ children, adminOnly = false, showNotifications, setShowNotifications }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && user.role !== 'admin') {
    // Allow students to access settings
    if (window.location.pathname === '/settings') {
      return (
        <>
          <TopBar showNotifications={showNotifications} setShowNotifications={setShowNotifications} />
          <Sidebar />
          <div style={{ marginLeft: 270 }}>
            {children}
          </div>
        </>
      );
    }

    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <h2>Access Denied</h2>
          <p>You do not have permission to access this page. This feature is only available to administrators.</p>
          <button
            style={styles.backButton}
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <TopBar showNotifications={showNotifications} setShowNotifications={setShowNotifications} />
      <Sidebar />
      <div style={{ marginLeft: 270 }}>
        {children}
      </div>
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 60px)',
    backgroundColor: 'var(--background-color)',
    color: 'var(--text-primary)',
    marginTop: '60px',
    '@media (min-width: 768px)': {
      marginTop: 0,
    }
  },
  content: {
    textAlign: 'center',
    padding: '2rem',
    maxWidth: '500px',
    margin: '0 auto',
  },
  backButton: {
    marginTop: '1rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: 'var(--primary-color)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: 'var(--primary-dark)',
    }
  }
};

export default App;
