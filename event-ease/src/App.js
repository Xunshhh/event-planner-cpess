import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopBar from './components/topbar';
import Sidebar from './components/sidebar';
import DashboardCard from './components/DashBoardCard';
import MainDashboard from './components/maindashboard';
import Event from './components/event';
import AddEvent from './components/addevent';

function App() {
  const [events] = useState([
    { id: 1, title: "CpE Symposium 2025", date: "2025-06-25", registered: true },
    { id: 2, title: "Innovation Expo", date: "2025-07-10", registered: false },
    // Add more if you want
  ]);

  return (
    <Router>
      <>
        <TopBar />
        <Sidebar />
        <div style={{ marginLeft: 270 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<MainDashboard events={events} />} />
            <Route path="/events" element={<Event />} />
            <Route path="/add-event" element={<AddEvent />} />
            <Route path="/about" element={<div>About Page</div>} />
          </Routes>
        </div>
      </>
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
    </Router>
  );
}

export default App;
