import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './settings.css';
import { useAuth } from '../contexts/AuthContext';

// Add some sample categories
const CATEGORIES = [
  { value: 'cpesymposium', label: 'CPESS Symposium' },
  { value: 'projectshowcase', label: 'Project Showcase' },
  { value: 'thesisdefense', label: 'Thesis Defense' },
  { value: 'techworkshop', label: 'Technical Workshop' },
  { value: 'indseminar', label: 'Industry Seminar' },
  { value: 'researchpres', label: 'Research Presentation' },
  { value: 'hackathon', label: 'Hackathon' },
  { value: 'careerfair', label: 'Career Fair' },
  { value: 'comprecruit', label: 'Company Recruitment' },
  { value: 'alumnimeet', label: 'Alumni Meetup' },
  { value: 'techcomp', label: 'Technical Competition' },
  { value: 'studentorg', label: 'Student Organization Event' },
  { value: 'orientation', label: 'Orientation Program' },
  { value: 'boardreview', label: 'Board Exam Review' },
  { value: 'certtraining', label: 'Professional Certification' },
  { value: 'cpesummit', label: 'CPESS Summit' },
  { value: 'innovationexpo', label: 'Innovation Expo' },
  { value: 'entrepreneur', label: 'Entrepreneurship Workshop' },
  { value: 'cpesummit', label: 'CPESS Annual Summit' },
  { value: 'networking', label: 'Professional Networking' },
  { value: 'internship', label: 'Internship Orientation' },
  { value: 'cpesummit', label: 'CPESS Research Forum' },
  { value: 'capstone', label: 'Capstone Project Presentation' },
  { value: 'cpesummit', label: 'CPESS Innovation Challenge' }
];

const AddEvent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: 'general',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    tags: '',
    status: 'upcoming'  // Default to upcoming
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    if (!formData.time) {
      newErrors.time = 'Time is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (formData.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }
    
    if (!formData.status) {
      newErrors.status = 'Status is required';
    }
    
    return Object.keys(newErrors).length === 0 ? null : newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for the changed field
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm();
    if (validationErrors) {
      setErrors(validationErrors);
      toast.error('Please fix the form errors before submitting');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get existing events from localStorage
      let events = [];
      try {
        const existingEvents = localStorage.getItem('events');
        if (existingEvents) {
          events = JSON.parse(existingEvents);
        }
      } catch (error) {
        console.error('Error parsing existing events:', error);
        // If parsing fails, start with empty array
        events = [];
      }
      
      // Create new event
      const newEvent = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
        status: 'upcoming',
        attendees: [],
        reminders: []
      };
      
      // Add new event and sort by date
      const updatedEvents = [...events, newEvent].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      });
      
      try {
        // Save events to localStorage
        localStorage.setItem('events', JSON.stringify(updatedEvents));
      } catch (error) {
        console.error('Error saving events:', error);
        throw new Error('Failed to save events to storage');
      }
      
      // Create notification
      const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      const newNotification = {
        id: `notification_${Date.now()}`,
        title: 'New Event Added',
        message: `A new event "${newEvent.title}" has been added to the calendar.`,
        type: 'info',
        read: false,
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem('notifications', JSON.stringify([...notifications, newNotification]));
      
      // Clear form
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        category: 'general',
        contactPerson: '',
        contactEmail: '',
        contactPhone: '',
        website: '',
        tags: '',
        status: 'upcoming'
      });
      
      // Reset errors
      setErrors({});
      
      // Show success message and navigate
      toast.success('Event added successfully!');
      navigate('/events', { replace: true });
    } catch (error) {
      console.error('Error adding event:', error);
      toast.error('Failed to add event. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user.isAuthenticated || user.role !== 'admin') {
    return (
      <div className="container">
        <h2>Access Denied</h2>
        <p>You do not have permission to create events. This feature is only available to administrators.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h2 style={styles.header}>Add New Event</h2>
        <p style={styles.subheader}>Create a new event in the CPESS event planner</p>
      </div>
      
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={errors.title ? { ...styles.input, borderColor: 'red' } : styles.input}
              placeholder="Enter event title"
            />
            {errors.title && <span style={styles.error}>{errors.title}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              style={errors.description ? { ...styles.textarea, borderColor: 'red' } : styles.textarea}
              placeholder="Enter event description"
            />
            {errors.description && <span style={styles.error}>{errors.description}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              style={errors.date ? { ...styles.input, borderColor: 'red' } : styles.input}
            />
            {errors.date && <span style={styles.error}>{errors.date}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Time *</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              style={errors.time ? { ...styles.input, borderColor: 'red' } : styles.input}
            />
            {errors.time && <span style={styles.error}>{errors.time}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              style={errors.location ? { ...styles.input, borderColor: 'red' } : styles.input}
              placeholder="Enter event location"
            />
            {errors.location && <span style={styles.error}>{errors.location}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={errors.category ? { ...styles.input, borderColor: 'red' } : styles.input}
              required
            >
              <option value="">Select Category</option>
              {CATEGORIES.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            {errors.category && <span style={styles.error}>{errors.category}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Event Status *</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={errors.status ? { ...styles.input, borderColor: 'red' } : styles.input}
              required
            >
              <option value="upcoming">Upcoming Event</option>
              <option value="past">Past Event</option>
            </select>
            {errors.status && <span style={styles.error}>{errors.status}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Contact Person</label>
            <input
              type="text"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              style={styles.input}
              placeholder="Name of contact person"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Contact Email</label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              style={errors.contactEmail ? { ...styles.input, borderColor: 'red' } : styles.input}
              placeholder="Enter contact email"
            />
            {errors.contactEmail && <span style={styles.error}>{errors.contactEmail}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Contact Phone</label>
            <input
              type="tel"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter contact phone number"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter event website"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Tags</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter tags (comma separated)"
            />
          </div>

          <div style={styles.submitButtonContainer}>
            <button
              type="submit"
              disabled={isLoading}
              style={
                isLoading ? 
                  {...styles.button, ...styles.buttonDisabled} : 
                  styles.button
              }
            >
              {isLoading ? (
                <>
                  <span style={{ marginRight: '8px' }}>Adding...</span>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderTop: '2px solid #fff',
                    borderRight: '2px solid #fff',
                    borderBottom: '2px solid transparent',
                    borderLeft: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                </>
              ) : (
                'Add Event'
              )}
            </button>
          </div>
        </form>
      </div>
      
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: 'var(--background-color)',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    minHeight: 'calc(100vh - 120px)', // Adjusted for topbar
    display: 'flex',
    flexDirection: 'column'
  },
  headerContainer: {
    marginBottom: '2rem',
    textAlign: 'center'
  },
  header: {
    fontSize: '2rem',
    color: 'var(--text-primary)',
    marginBottom: '0.5rem'
  },
  subheader: {
    color: 'var(--text-secondary)',
    fontSize: '1.1rem'
  },
  formContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    marginTop: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  submitButtonContainer: {
    marginTop: '2rem',
    padding: '0 20px',
    marginBottom: '40px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontSize: '1rem',
    color: 'var(--text-secondary)',
    fontWeight: 500
  },
  input: {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid var(--border-color)',
    fontSize: '1rem',
    backgroundColor: 'var(--background-color)',
    color: 'var(--text-primary)',
    transition: 'border-color 0.3s ease'
  },
  textarea: {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid var(--border-color)',
    fontSize: '1rem',
    minHeight: '120px',
    resize: 'vertical',
    backgroundColor: 'var(--background-color)',
    color: 'var(--text-primary)',
    transition: 'border-color 0.3s ease'
  },
  select: {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid var(--border-color)',
    fontSize: '1rem',
    backgroundColor: 'var(--background-color)',
    color: 'var(--text-primary)'
  },
  error: {
    color: 'var(--text-highlight)',
    fontSize: '0.875rem',
    marginTop: '0.25rem'
  },
  button: {
    padding: '12px 24px',
    backgroundColor: 'var(--primary-color)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 500,
    transition: 'all 0.3s ease',
    opacity: 1,
    pointerEvents: 'auto'
  },
  buttonDisabled: {
    opacity: 0.6,
    pointerEvents: 'none'
  }
};

export default AddEvent;
