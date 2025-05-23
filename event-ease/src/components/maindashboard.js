import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendar, 
  faClock, 
  faMapMarkerAlt, 
  faTags, 
  faUserGraduate, 
  faProjectDiagram, 
  faLightbulb, 
  faCode, 
  faRobot, 
  faGraduationCap, 
  faIndustry, 
  faUsers, 
  faTrophy, 
  faBook, 
  faCertificate,
  faBriefcase
} from '@fortawesome/free-solid-svg-icons';
import DashboardCard from './DashBoardCard';
import EventCard from './EventCard';

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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const savedEvents = JSON.parse(localStorage.getItem('events') || '[]');
        
        // Sort events by date
        savedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        setEvents(savedEvents);
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
    new Date(event.date) >= new Date()
  );

  const totalEvents = upcomingEvents.length;
  const totalStudents = upcomingEvents.filter(event => 
    event.category.toLowerCase().includes('student')
  ).length;
  
  const totalProjects = upcomingEvents.filter(event => 
    event.category.toLowerCase().includes('project') || 
    event.category.toLowerCase().includes('showcase')
  ).length;
  
  const totalVision = upcomingEvents.filter(event => 
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
        <DashboardCard title="Upcoming Events" value={totalEvents} type="events" />
        <DashboardCard title="Student Events" value={totalStudents} type="students" />
        <DashboardCard title="Project Showcases" value={totalProjects} type="projects" />
        <DashboardCard title="Vision Events" value={totalVision} type="cpe" />
      </div>

      <section style={styles.section}>
        <h2 style={styles.sectionHeader}>About CpE in UB</h2>
        <p style={styles.paragraph}>
          The Computer Engineering program at the University of Batangas under CPESS is dedicated
          to cultivating future-ready engineers capable of addressing real-world problems using
          intelligent systems, embedded technologies, and innovative solutions. This dashboard
          supports the coordination of events, capstone showcases, and collaborative tech growth.
        </p>
      </section>


      <section style={styles.section}>
        <h2 style={styles.sectionHeader}>Upcoming Events</h2>
        {loading ? (
          <div style={styles.loadingState}>
            <p>Loading events...</p>
          </div>
        ) : upcomingEvents.length === 0 ? (
          <div style={styles.noEventsContainer}>
            <NoEventsIllustration />
            <p style={styles.noEventsText}>No upcoming events yet.</p>
            <p style={{ color: '#777', fontSize: '0.9rem' }}>
              Create new events to get started!
            </p>
          </div>
        ) : (
          <div style={styles.eventsList}>
            {upcomingEvents.map((event, index) => (
              <div key={index} style={styles.eventItem}>
                <div style={styles.eventIcon}>
                  <FontAwesomeIcon 
                    icon={categoryIcons[event.category] || faCalendar} 
                    size="2x" 
                    style={{ color: '#3498db' }}
                  />
                </div>
                <div style={styles.eventInfo}>
                  <div style={styles.eventHeader}>
                    <h3 style={styles.eventTitle}>{event.title}</h3>
                    <div style={styles.categoryBadge}>
                      <FontAwesomeIcon icon={faTags} style={{ marginRight: '4px' }} />
                      {event.category}
                    </div>
                  </div>
                  <div style={styles.eventMeta}>
                    <div style={styles.metaItem}>
                      <FontAwesomeIcon icon={faCalendar} style={{ marginRight: '6px' }} />
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div style={styles.metaItem}>
                      <FontAwesomeIcon icon={faClock} style={{ marginRight: '6px' }} />
                      {new Date(event.date + 'T' + event.time).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit'
                      })}
                    </div>
                    <div style={styles.metaItem}>
                      <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '6px' }} />
                      {event.location}
                    </div>
                  </div>
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
    color: '#666',
    fontSize: '1.1rem'
  },
  eventsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginTop: '20px'
  },
  eventItem: {
    backgroundColor: '#fff',
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
    color: '#666'
  },
  eventTitle: {
    margin: 0,
    fontSize: '1.2rem',
    fontWeight: 600,
    color: '#2c3e50'
  },
  categoryBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    background: '#f8f9fa',
    color: '#555',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '0.85rem',
    border: '1px solid #e0e0e0'
  },
  categoryBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    background: '#f8f9fa',
    color: '#555',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '0.85rem',
    border: '1px solid #e0e0e0'
  },
  eventDate: {
    margin: 0,
    color: '#3498db',
    fontSize: '1rem',
    fontWeight: 500
  },
  eventTime: {
    margin: 0,
    color: '#7f8c8d',
    fontSize: '0.9rem'
  },
  eventLocation: {
    margin: 0,
    color: '#34495e',
    fontSize: '0.95rem',
    fontWeight: 500
  },
  eventTitle: {
    margin: 0,
    fontSize: '1.2rem',
    fontWeight: 600,
    color: '#2c3e50'
  },
  eventDate: {
    margin: 0,
    color: '#3498db',
    fontSize: '1rem',
    fontWeight: 500
  },
  eventTime: {
    margin: 0,
    color: '#7f8c8d',
    fontSize: '0.9rem'
  },
  eventLocation: {
    margin: 0,
    color: '#34495e',
    fontSize: '0.95rem',
    fontWeight: 500
  },
  eventCategory: {
    marginTop: '10px'
  },
  categoryBadge: {
    display: 'inline-block',
    background: '#f8f9fa',
    color: '#555',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '0.85rem',
    border: '1px solid #e0e0e0'
  },
  container: {
    padding: '30px 40px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f4f7fc',
    minHeight: '100vh',
    color: '#222',
  },
  header: {
    marginBottom: 6,
    fontSize: '2.4rem',
    fontWeight: '700',
    color: '#003366',
    letterSpacing: '1px',
  },
  subtitle: {
    marginBottom: 40,
    color: '#555',
    fontSize: '1.1rem',
    fontWeight: '500',
  },
  cardGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '24px',
    marginBottom: '50px',
  },
  section: {
    backgroundColor: '#ffffff',
    padding: '25px 30px',
    borderRadius: '12px',
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.07)',
    color: '#333',
    marginBottom: '40px',
  },
  sectionHeader: {
    marginBottom: '18px',
    fontSize: '1.8rem',
    fontWeight: '600',
    color: '#004080',
  },
  paragraph: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#444',
  },
  eventGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
  },
  noEventsContainer: {
    textAlign: 'center',
    padding: '50px 20px',
    color: '#555',
  },
  noEventsText: {
    fontSize: '1.3rem',
    fontWeight: '600',
    marginBottom: 8,
  },
};

export default MainDashboard;
