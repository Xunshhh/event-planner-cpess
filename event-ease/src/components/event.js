import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './event.css';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Event = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    // Simulate fetching events from backend
    const fetchEvents = async () => {
      try {
        // In a real application, you would fetch from your backend API
        // For now, we'll use a delay to simulate loading
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // You can load initial events from localStorage if available
        const savedEvents = JSON.parse(localStorage.getItem('events') || '[]');
        setEvents(savedEvents);
        setFilteredEvents(savedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredEvents(events);
      return;
    }

    const filtered = events.filter(event => {
      const searchTermLower = searchTerm.toLowerCase();
      return (
        event.title.toLowerCase().includes(searchTermLower) ||
        event.category.toLowerCase().includes(searchTermLower) ||
        event.location.toLowerCase().includes(searchTermLower) ||
        event.description.toLowerCase().includes(searchTermLower)
      );
    });
    setFilteredEvents(filtered);
  }, [searchTerm, events]);

  const addEvent = (newEvent) => {
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    // Save to localStorage
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  };

  return (
    <div className="event-container">
      <h2>Events</h2>
      <div className="search-container">
        <div className="search-icon">
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      
      {loading ? (
        <div className="loading">Loading events...</div>
      ) : (
        <div className="events-grid">
          {searchTerm && filteredEvents.length === 0 && (
            <div className="no-events">
              <p>No events found matching "{searchTerm}"</p>
            </div>
          )}
          {events.length === 0 ? (
            <div className="no-events">
              <p>No events available. Events will be displayed here once created.</p>
            </div>
          ) : (
            events.map((event, index) => (
              <div className="event-card" key={index}>
                <div className="category-badge" data-label="Category: ">{event.category}</div>
                <h3>{event.title}</h3>
                <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>
                <p className="event-time">{new Date(event.date + 'T' + event.time).toLocaleTimeString()}</p>
                <p className="event-location">{event.location}</p>
                <p className="event-description">{event.description}</p>
                <div className="event-details">
                  {event.contactPerson && <p data-label="Contact">{event.contactPerson}</p>}
                  {event.contactEmail && <p data-label="Email">{event.contactEmail}</p>}
                  {event.contactPhone && <p data-label="Phone">{event.contactPhone}</p>}
                  {event.website && <p data-label="Website">{event.website}</p>}
                  {event.tags && event.tags.split(',').map((tag, i) => (
                    <span key={i} className="tag">{tag.trim()}</span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

Event.propTypes = {
  // Add any props here if needed
};

export default Event;
