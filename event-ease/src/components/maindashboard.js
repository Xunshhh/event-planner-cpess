import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendar, 
  faClock, 
  faMapMarkerAlt, 
  faTags,
  faCertificate,
  faProjectDiagram,
  faGraduationCap,
  faCode,
  faIndustry,
  faLightbulb,
  faRobot,
  faUsers,
  faTrophy,
  faBriefcase,
  faBook,
  faUserGraduate,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import './maindashboard.css';
import DashboardCard from './DashBoardCard';
import './Calendar.css';
import Calendar from './Calendar';
import EventService from '../services/EventService';
import { useAuth } from '../contexts/AuthContext';

const eventService = EventService;

const NoEventsIllustration = () => (
  <svg
    width="150"
    height="150"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ marginBottom: 15 }}
  >
    <circle cx="32" cy="32" r="30" stroke="#bbb" strokeWidth="2" />
    <path
      d="M20 28h24M20 36h24M24 20h16v24H24z"
      stroke="#bbb"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="32" cy="44" r="2" fill="#bbb" />
  </svg>
);

const MainDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [groupedEvents, setGroupedEvents] = useState({});

  const handleEventClick = (event) => {
    // Navigate to event details page
    navigate(`/event/${event.id}`);
  };

  const { user } = useAuth();

  const handleDeleteEvent = (eventId) => {
    if (user.role === 'admin') {
      if (window.confirm('Are you sure you want to delete this event?')) {
        const updatedEvents = eventService.deleteEvent(eventId);
        setEvents(updatedEvents);
        // Update grouped events
        const groupedEvents = updatedEvents.reduce((acc, event) => {
          const date = new Date(event.date).toLocaleDateString();
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(event);
          return acc;
        }, {});
        setGroupedEvents(groupedEvents);
      }
    } else {
      console.log('Only admins can delete events');
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const savedEvents = eventService.getAllEvents();
        
        // Sort events by date and time
        savedEvents.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          const timeA = a.time ? new Date(dateA.setHours(...a.time.split(':'))) : dateA;
          const timeB = b.time ? new Date(dateB.setHours(...b.time.split(':'))) : dateB;
          return timeA - timeB;
        });
        
        // Group events by date for better display
        const groupedEvents = savedEvents.reduce((acc, event) => {
          const date = new Date(event.date).toLocaleDateString();
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(event);
          return acc;
        }, {});

        setEvents(savedEvents);
        setGroupedEvents(groupedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Category icons mapping
  const categoryIcons = {
    'cpesymposium': faCertificate,
    'projectshowcase': faProjectDiagram,
    'thesisdefense': faGraduationCap,
    'techworkshop': faCode,
    'indseminar': faIndustry,
    'researchpres': faLightbulb,
    'hackathon': faRobot,
    'careerfair': faUsers,
    'comprecruit': faIndustry,
    'alumnimeet': faUserGraduate,
    'techcomp': faTrophy,
    'studentorg': faUsers,
    'orientation': faBook,
    'boardreview': faBook,
    'certtraining': faCertificate,
    'cpesummit': faCertificate,
    'innovationexpo': faLightbulb,
    'entrepreneur': faIndustry,
    'internship': faBriefcase,
    'cpesummit': faCertificate,
    'networking': faUsers,
    'capstone': faProjectDiagram,
    'cpesummit': faCertificate
  };

  // Calculate dashboard stats
  const upcomingEvents = events.filter(event => 
    event.status === 'upcoming'
  ).slice(0, 5); // Show only first 5 upcoming events

  const pastEvents = events.filter(event => 
    event.status === 'past'
  );

  const totalEvents = events.length;
  const totalStudents = events.filter(event => 
    event.category.toLowerCase().includes('student')
  ).length;
  
  const totalProjects = events.filter(event => 
    event.category.toLowerCase().includes('project') || 
    event.category.toLowerCase().includes('showcase')
  ).length;
  
  const totalVision = events.filter(event => 
    event.category.toLowerCase().includes('vision') || 
    event.category.toLowerCase().includes('research')
  ).length;

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>CPESS Event Planner Dashboard</h1>
      <p style={styles.subtitle}>
        Empowering Computer Engineering through Innovation & Collaboration
      </p>

      <div style={styles.cardGrid}>
        <DashboardCard
          title="Total Events"
          value={totalEvents}
          icon={<FontAwesomeIcon icon={faCalendar} />}
          color="#4CAF50"
        />
        <DashboardCard
          title="Upcoming Events"
          value={upcomingEvents.length}
          icon={<FontAwesomeIcon icon={faClock} />}
          color="#2196F3"
        />
        <DashboardCard
          title="Past Events"
          value={pastEvents.length}
          icon={<FontAwesomeIcon icon={faMapMarkerAlt} />}
          color="#FF9800"
        />
        <DashboardCard title="Vision Events" value={totalVision} type="cpe" />
      </div>

      <section className="dashboard-section">
        <h2 className="section-header">About CpE in UB</h2>
        <p className="section-content">
          The Computer Engineering program at the University of Batangas under CPESS is dedicated
          to cultivating future-ready engineers capable of addressing real-world problems using
          intelligent systems, embedded technologies, and innovative solutions. This dashboard
          supports the coordination of events, capstone showcases, and collaborative tech growth.
        </p>
      </section>

      <section className="dashboard-section">
        <h2 className="section-header">Upcoming Events</h2>
        {upcomingEvents.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: 'var(--text-secondary)',
            fontSize: '1.1rem'
          }}>
            <NoEventsIllustration />
            <p style={{
              fontSize: '1rem',
              fontWeight: 500,
              color: 'var(--text-primary)',
            }}>No upcoming events yet.</p>
            <p style={{
              color: '#777',
              fontSize: '0.9rem'
            }}>
              Create new events to get started!
            </p>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginTop: '20px'
          }}>
            {upcomingEvents.map((event, index) => (
              <div key={index} style={{
                backgroundColor: 'var(--background-color)',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                display: 'flex',
                gap: '20px',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.12)'
                }
              }} 
              onClick={() => handleEventClick(event)}>
                <div style={{
                  flexShrink: 0,
                  width: '50px',
                  height: '50px',
                  borderRadius: '8px',
                  backgroundColor: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}>
                  <FontAwesomeIcon icon={categoryIcons[event.category] || faCalendar} size="lg" />
                </div>

                <div style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                  }}>
                    <div>
                      <h3 style={{
                        margin: 0,
                        fontSize: '1.2rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)'
                      }}>{event.title}</h3>
                      <div style={{
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'center',
                        marginTop: '4px'
                      }}>
                        <span style={{
                          backgroundColor: '#e3f2fd',
                          color: '#1976d2',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '0.875rem',
                          fontWeight: 500
                        }}>{event.category}</span>
                        <span style={{
                          backgroundColor: '#fff3e0',
                          color: '#f4511e',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '0.875rem',
                          fontWeight: 500
                        }}>Upcoming</span>
                      </div>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <FontAwesomeIcon icon={faClock} />
                      <span style={{
                        color: 'var(--text-secondary)'
                      }}>{event.time}</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                      <span style={{
                        color: 'var(--text-secondary)'
                      }}>{event.location}</span>
                    </div>
                  </div>

                  <p style={{
                    margin: 0,
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    lineHeight: '1.4'
                  }}>{event.description}</p>

                  {user.role === 'admin' && (
                    <div className="event-actions">
                      <button onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteEvent(event.id);
                      }} className="delete-button">
                        <FontAwesomeIcon icon={faTrash} className="trash-icon" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

const styles = {
  loadingState: {
    textAlign: 'center',
    padding: '40px',
    color: 'var(--text-secondary)',
    fontSize: '1.1rem'
  },
  eventsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginTop: '20px'
  },
  eventItem: {
    backgroundColor: 'var(--background-color)',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s ease',
    display: 'flex',
    gap: '15px'
  },
  eventIcon: {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px'
  },
  eventInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  eventHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  eventMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: 'var(--text-secondary)'
  },
  eventTitle: {
    margin: 0,
    fontSize: '1.2rem',
    fontWeight: 600,
    color: 'var(--text-primary)'
  },
  categoryBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    background: 'var(--secondary-bg)',
    color: 'var(--text-primary)',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '0.85rem',
    border: '1px solid var(--border-color)'
  },
  eventDate: {
    margin: 0,
    color: 'var(--text-highlight)',
    fontSize: '1rem',
    fontWeight: 500
  },
  eventTime: {
    margin: 0,
    color: 'var(--text-secondary)',
    fontSize: '0.9rem'
  },
  eventLocation: {
    margin: 0,
    color: 'var(--text-primary)',
    fontSize: '0.95rem',
    fontWeight: 500
  },
  eventCategory: {
    marginTop: '10px'
  },
  container: {
    padding: '20px',
    backgroundColor: 'var(--background-color)',
    minHeight: 'calc(100vh - 60px)',
    color: 'var(--text-primary)',
    marginTop: '60px',
    '@media (min-width: 768px)': {
      padding: '40px',
      marginTop: 0,
    }
  },
  header: {
    marginBottom: 6,
    fontSize: '2rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    letterSpacing: '1px',
    '@media (min-width: 768px)': {
      fontSize: '2.4rem',
    }
  },
  subtitle: {
    marginBottom: 30,
    color: 'var(--text-secondary)',
    fontSize: '1rem',
    fontWeight: '500',
    '@media (min-width: 768px)': {
      marginBottom: 40,
      fontSize: '1.1rem',
    }
  },
  cardGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    marginBottom: '30px',
    '@media (min-width: 768px)': {
      gap: '24px',
      marginBottom: '50px',
    }
  },
  section: {
    backgroundColor: 'var(--secondary-bg)',
    padding: '20px 20px',
    borderRadius: '12px',
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.07)',
    color: 'var(--text-primary)',
    marginBottom: '30px',
    '@media (min-width: 768px)': {
      padding: '25px 30px',
      marginBottom: '40px',
    }
  },
  sectionHeader: {
    marginBottom: '15px',
    fontSize: '1.6rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
    '@media (min-width: 768px)': {
      marginBottom: '18px',
      fontSize: '1.8rem',
    }
  },
  paragraph: {
    fontSize: '0.95rem',
    lineHeight: '1.6',
    color: 'var(--text-secondary)',
    '@media (min-width: 768px)': {
      fontSize: '1rem',
    }
  },
  eventGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '16px',
    '@media (min-width: 768px)': {
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px',
    }
  },
  noEventsContainer: {
    textAlign: 'center',
    padding: '40px 15px',
    color: 'var(--text-secondary)',
    '@media (min-width: 768px)': {
      padding: '50px 20px',
    }
  },
  noEventsText: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: 8,
    '@media (min-width: 768px)': {
      fontSize: '1.3rem',
    }
  },
};

export default MainDashboard;
