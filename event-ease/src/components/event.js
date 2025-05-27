import React, { useState, useEffect } from 'react';
import './settings.css';
import PropTypes from 'prop-types';
import './event.css';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faSort, 
  faFilter, 
  faCalendar, 
  faClock, 
  faMapMarkerAlt, 
  faUser, 
  faEnvelope, 
  faPhone, 
  faLink, 
  faTags,
  faCheckCircle,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/AuthContext';

const Event = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    category: '',
    dateRange: 'all'
  });

  // Initialize events from localStorage if they exist
  useEffect(() => {
    // Get events from localStorage
    const savedEvents = localStorage.getItem('events');
    
    try {
      // If events exist and are valid JSON, parse them
      let events = [];
      if (savedEvents) {
        events = JSON.parse(savedEvents);
      }
      
      // Sort events by date
      const sortedEvents = events.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      });
      
      setEvents(sortedEvents);
      setFilteredEvents(sortedEvents);
      setLoading(false);
    } catch (error) {
      console.error('Error loading events:', error);
      // Only clear localStorage if we had data that caused the error
      if (savedEvents) {
        localStorage.removeItem('events');
      }
      setEvents([]);
      setFilteredEvents([]);
      setLoading(false);
    }
  }, []);

  const handleRemoveEvent = (eventId) => {
    if (user.role !== 'admin') {
      toast.error('You do not have permission to remove events.');
      return;
    }

    if (window.confirm('Are you sure you want to permanently remove this event? This action cannot be undone.')) {
      // Get current events
      const updatedEvents = events.filter(event => event.id !== eventId);
      setEvents(updatedEvents);
      setFilteredEvents(updatedEvents);
      
      // Save updated events to localStorage
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      
      // Remove the event from any related data structures
      // Get notifications and remove any related to this event
      const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      const updatedNotifications = notifications.filter(notification => 
        !notification.message.includes(events.find(e => e.id === eventId).title)
      );
      localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
      
      toast.success('Event permanently removed!');
    }
  };

  const handleMarkAsEnded = (eventId) => {
    if (user.role !== 'admin') {
      toast.error('You do not have permission to mark events as ended.');
      return;
    }

    if (window.confirm('Are you sure you want to mark this event as ended?')) {
      const updatedEvents = events.map(event => 
        event.id === eventId ? { ...event, status: 'past' } : event
      );
      setEvents(updatedEvents);
      setFilteredEvents(updatedEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      
      // Add notification for event marked as ended
      const notification = {
        id: Date.now().toString(),
        title: 'Event Marked as Ended',
        message: `The event "${events.find(e => e.id === eventId).title}" has been marked as ended.`,
        type: 'info',
        read: false,
        timestamp: new Date().toISOString()
      };
      
      // Get existing notifications
      const currentNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      // Add new notification
      const updatedNotifications = [...currentNotifications, notification];
      localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
      
      toast.success('Event marked as ended!');
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const savedEvents = JSON.parse(localStorage.getItem('events') || '[]');
      setEvents(savedEvents);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  fetchEvents();
  }, []);

  useEffect(() => {
    if (!searchTerm && !selectedFilters.category && selectedFilters.dateRange === 'all') {
      setFilteredEvents(events);
      return;
    }

    let filtered = events;

    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      filtered = filtered.filter(event => {
        return (
          event.title.toLowerCase().includes(searchTermLower) ||
          event.category.toLowerCase().includes(searchTermLower) ||
          event.location.toLowerCase().includes(searchTermLower) ||
          event.description.toLowerCase().includes(searchTermLower)
        );
      });
    }

    if (selectedFilters.category) {
      filtered = filtered.filter(event => 
        event.category.toLowerCase() === selectedFilters.category.toLowerCase()
      );
    }

    if (selectedFilters.dateRange !== 'all') {
      const now = new Date();
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date + 'T' + event.time);
        if (selectedFilters.dateRange === 'upcoming') {
          return eventDate > now;
        } else if (selectedFilters.dateRange === 'past') {
          return eventDate < now;
        }
        return true;
      });
    }

    filtered = filtered.sort((a, b) => {
      const dateA = new Date(a.date + 'T' + a.time);
      const dateB = new Date(b.date + 'T' + b.time);
      
      if (sortBy === 'date') {
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      }
      
      if (sortBy === 'title') {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        return sortOrder === 'asc' ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
      }
      
      return 0;
    });

    setFilteredEvents(filtered);
  }, [searchTerm, events, selectedFilters, sortBy, sortOrder]);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'upcoming':
        return '#4CAF50';
      case 'ongoing':
        return '#2196F3';
      case 'past':
        return '#9E9E9E';
      default:
        return '#666';
    }
  };

  const getStatusClass = (status, eventDate, eventTime) => {
    if (status === 'upcoming' || status === 'past') {
      return status;
    }

    const now = new Date();
    const eventDateTime = new Date(eventDate + 'T' + eventTime);
    if (eventDateTime > now) return 'upcoming';
    if (eventDateTime < now && eventDateTime > new Date(now - 24 * 60 * 60 * 1000)) return 'ongoing';
    return 'past';
  };



  return (
    <div className="event-container" style={{
      marginTop: '60px',
      '@media (min-width: 768px)': {
        marginTop: 0,
      }
    }}>
      <div className="event-header">
        <div className="event-header-content">
          <h2>Events</h2>
          <p className="event-header-subtitle">View and manage all CPESS events</p>
        </div>
        <div className="event-filters">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="filter-button"
          >
            <FontAwesomeIcon icon={faFilter} /> Filters
          </button>
          <div className="sort-options">
            <button
              onClick={() => handleSort('date')}
              className={`sort-button ${sortBy === 'date' ? 'active' : ''}`}
            >
              <FontAwesomeIcon icon={faSort} /> Date
            </button>
            <button
              onClick={() => handleSort('title')}
              className={`sort-button ${sortBy === 'title' ? 'active' : ''}`}
            >
              <FontAwesomeIcon icon={faSort} /> Title
            </button>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="filter-panel">
          <div className="filter-group">
            <label>Category:</label>
            <select
              value={selectedFilters.category}
              onChange={(e) => setSelectedFilters({
                ...selectedFilters,
                category: e.target.value
              })}
            >
              <option value="">All Categories</option>
              <option value="cpesymposium">CPESS Symposium</option>
              <option value="projectshowcase">Project Showcase</option>
              <option value="thesisdefense">Thesis Defense</option>
              <option value="techworkshop">Technical Workshop</option>
              <option value="indseminar">Industry Seminar</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Date Range:</label>
            <select
              value={selectedFilters.dateRange}
              onChange={(e) => setSelectedFilters({
                ...selectedFilters,
                dateRange: e.target.value
              })}
            >
              <option value="all">All Events</option>
              <option value="upcoming">Upcoming Events</option>
              <option value="past">Past Events</option>
            </select>
          </div>
        </div>
      )}

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
      
      <div className="events-grid">
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading events...</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="no-events">
            <p>No events found. Create a new event to get started!</p>
          </div>
        ) : (
          Object.entries(currentEvents.reduce((acc, event) => {
            const date = new Date(event.date).toLocaleDateString();
            if (!acc[date]) {
              acc[date] = [];
            }
            acc[date].push(event);
            return acc;
          }, {})).map(([date, events]) => (
            <div key={date} className="event-group">
              <div className="event-group-header">
                <h3>{date}</h3>
              </div>
              <div className="event-group-content">
                {events.map((event, index) => (
                  <div key={index} className="event-card">
                    <div className="event-card-header">
                      <div className="event-status">
                        <span className="status-dot" style={{ backgroundColor: getStatusColor(event.status) }}></span>
                        <span>{event.status}</span>
                      </div>
                      <div className="event-actions">
                        {user.role === 'admin' && (
                          <>
                            <button
                              onClick={() => handleMarkAsEnded(event.id)}
                              className="action-button"
                              title="Mark as ended"
                            >
                              <FontAwesomeIcon icon={faCheckCircle} />
                            </button>
                            <button
                              onClick={() => handleRemoveEvent(event.id)}
                              className="action-button"
                              title="Remove event"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="event-content">
                      <h3>{event.title}</h3>
                      <div className="event-meta">
                        <div className="meta-item">
                          <FontAwesomeIcon icon={faClock} className="meta-icon" />
                          <span>{event.time}</span>
                        </div>
                        <div className="meta-item">
                          <FontAwesomeIcon icon={faMapMarkerAlt} className="meta-icon" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <p className="event-description">{event.description}</p>
                      <div className="event-details">
                        {event.contactPerson && (
                          <div className="detail-item">
                            <FontAwesomeIcon icon={faUser} className="meta-icon" />
                            <span>Contact: {event.contactPerson}</span>
                          </div>
                        )}
                        {event.contactEmail && (
                          <div className="detail-item">
                            <FontAwesomeIcon icon={faEnvelope} className="meta-icon" />
                            <a href={`mailto:${event.contactEmail}`} style={{ color: 'inherit' }}>
                              {event.contactEmail}
                            </a>
                          </div>
                        )}
                        {event.contactPhone && (
                          <div className="detail-item">
                            <FontAwesomeIcon icon={faPhone} className="meta-icon" />
                            <a href={`tel:${event.contactPhone}`} style={{ color: 'inherit' }}>
                              {event.contactPhone}
                            </a>
                          </div>
                        )}
                        {event.website && (
                          <div className="detail-item">
                            <FontAwesomeIcon icon={faLink} className="meta-icon" />
                            <a href={event.website} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                              Website
                            </a>
                          </div>
                        )}
                        {event.tags && (
                          <div className="detail-item">
                            <FontAwesomeIcon icon={faTags} className="meta-icon" />
                            <span>Tags: {event.tags}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(filteredEvents.length / eventsPerPage)}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage >= Math.ceil(filteredEvents.length / eventsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

Event.propTypes = {
};

export default Event;
