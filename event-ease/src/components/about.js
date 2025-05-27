import React from 'react';
import PropTypes from 'prop-types';
import './about.css';
import { 
  faCalendar, 
  faFilter, 
  faSearch, 
  faClock, 
  faTags, 
  faUsers, 
  faInfoCircle, 
  faMobileAlt, 
  faDesktop, 
  faPalette, 
  faCloudDownloadAlt 
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>EventEase Event Planner</h1>
        <p className="subtitle">Your Modern Event Management Solution</p>
      </div>

      <section className="about-section">
        <div className="section-header">
          <FontAwesomeIcon icon={faCalendar} className="section-icon" />
          <h2>Event Management</h2>
        </div>
        <div className="features-grid">
          <div className="feature-item">
            <h3>Event Scheduling</h3>
            <p>Effortlessly create and schedule events with detailed information.</p>
          </div>
          <div className="feature-item">
            <h3>Category Organization</h3>
            <p>Organize events into categories for better management.</p>
          </div>
          <div className="feature-item">
            <h3>Event Status Tracking</h3>
            <p>Track event status from planning to completion.</p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="section-header">
          <FontAwesomeIcon icon={faFilter} className="section-icon" />
          <h2>Advanced Filtering</h2>
        </div>
        <div className="features-grid">
          <div className="feature-item">
            <h3>Date Range Filtering</h3>
            <p>Filter events by upcoming or past events.</p>
          </div>
          <div className="feature-item">
            <h3>Category Filtering</h3>
            <p>Find events by category type.</p>
          </div>
          <div className="feature-item">
            <h3>Search Functionality</h3>
            <p>Quickly find events using our powerful search.</p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="section-header">
          <FontAwesomeIcon icon={faClock} className="section-icon" />
          <h2>Calendar Integration</h2>
        </div>
        <div className="features-grid">
          <div className="feature-item">
            <h3>Monthly View</h3>
            <p>View events in a monthly calendar layout.</p>
          </div>
          <div className="feature-item">
            <h3>Event Timeline</h3>
            <p>Track events chronologically.</p>
          </div>
          <div className="feature-item">
            <h3>Event Reminders</h3>
            <p>Set reminders for upcoming events.</p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="section-header">
          <FontAwesomeIcon icon={faUsers} className="section-icon" />
          <h2>User Experience</h2>
        </div>
        <div className="features-grid">
          <div className="feature-item">
            <h3>Responsive Design</h3>
            <p>Works perfectly on all devices.</p>
          </div>
          <div className="feature-item">
            <h3>Modern UI</h3>
            <p>Clean and intuitive interface.</p>
          </div>
          <div className="feature-item">
            <h3>Dark Mode</h3>
            <p>Eye-friendly dark theme option.</p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="section-header">
          <FontAwesomeIcon icon={faInfoCircle} className="section-icon" />
          <h2>About EventEase</h2>
        </div>
        <div className="about-content">
          <p>
            EventEase Event Planner is a modern web application designed to streamline event management.
            With features like advanced filtering, calendar integration, and a responsive design,
            it makes organizing and tracking events easier than ever.
          </p>
          <p>
            Built with React and modern web technologies, EventEase provides a seamless experience
            for both event organizers and attendees.
          </p>
        </div>
      </section>

      <section className="about-section">
        <div className="section-header">
          <FontAwesomeIcon icon={faMobileAlt} className="section-icon" />
          <h2>Mobile & Desktop Support</h2>
        </div>
        <div className="about-content">
          <p>
            EventEase works perfectly on both mobile devices and desktop computers.
            The responsive design ensures a great experience no matter how you access it.
          </p>
        </div>
      </section>

      <section className="about-section">
        <div className="section-header">
          <FontAwesomeIcon icon={faPalette} className="section-icon" />
          <h2>Customization</h2>
        </div>
        <div className="about-content">
          <p>
            Choose between light and dark themes to match your preference.
            The clean and modern interface is designed for maximum usability.
          </p>
        </div>
      </section>

      <section className="about-section">
        <div className="section-header">
          <FontAwesomeIcon icon={faCloudDownloadAlt} className="section-icon" />
          <h2>Get Started</h2>
        </div>
        <div className="about-content">
          <p>
            Start managing your events today with EventEase!
            Simply create an account and begin organizing your events.
          </p>
        </div>
      </section>
      <footer className="about-footer">
        <div className="copyright">
          <p>&copy; 2025 EventEase. All rights reserved.</p>
          <p>Powered by EventEase Technologies</p>
        </div>
      </footer>
    </div>
  );
};

About.propTypes = {
  // Add any props here if needed
};

export default About;
