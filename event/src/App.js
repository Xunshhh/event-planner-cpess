import React, { useState } from 'react';
import Sidebar from './components/sidebar';
import Topbar from './components/topbar';
import MainDashboard from './components/MainDashboard';
import AllEventsPage from './components/AllEventsPage';
import JoinedEventsPage from './components/JoinedEventsPage';
import SettingsPage from './components/SettingsPage';
import ProfilePage from './components/ProfilePage';
import ClubsPage from './components/ClubsPage'; // Import Clubs Page

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard'); // default to dashboard
  const [username, setUsername] = useState('John Doe'); // Example username, replace with dynamic data

  // Function to switch pages
  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  // Logout function (for example, clearing session or token)
  const handleLogout = () => {
    alert('Logged out!');
    // Clear session/token and redirect to login page if needed
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar handleNavigation={handleNavigation} />
        <div className="col-md-10">
          <Topbar username={username} handleLogout={handleLogout} />
          
          {currentPage === 'dashboard' && <MainDashboard />}
          {currentPage === 'allEvents' && <AllEventsPage />}
          {currentPage === 'joined' && <JoinedEventsPage />}
          {currentPage === 'settings' && <SettingsPage />}
          {currentPage === 'profile' && <ProfilePage />}
          {currentPage === 'clubs' && <ClubsPage />} {/* Add conditional rendering for Clubs Page */}
        </div>
      </div>
    </div>
  );
}

export default App;
