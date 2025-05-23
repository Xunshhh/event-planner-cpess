import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    tags: ''
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
    
    const validationErrors = validateForm();
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save event to localStorage
      const events = JSON.parse(localStorage.getItem('events') || '[]');
      const newEvent = {
        id: Date.now(), // Generate unique ID
        ...formData,
        createdAt: new Date().toISOString()
      };
      
      const updatedEvents = [...events, newEvent];
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      
      // Clear form after successful submission
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
        tags: ''
      });
      
      toast.success('Event added successfully!');
      navigate('/events');
    } catch (error) {
      console.error('Error adding event:', error);
      toast.error('Failed to add event. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h2 style={styles.header}>Add New Event</h2>
        <p style={styles.subheader}>Create a new event in the CPESS event planner</p>
      </div>
      
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
            required
            style={styles.select}
          >
            {CATEGORIES.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
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

        <button
          type="submit"
          style={{
            ...styles.submitButton,
            opacity: isLoading ? 0.6 : 1,
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Adding Event...' : 'Add Event'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  headerContainer: {
    marginBottom: '2rem',
    textAlign: 'center'
  },
  header: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '0.5rem'
  },
  subheader: {
    color: '#666',
    fontSize: '1rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontSize: '1rem',
    color: '#333',
    fontWeight: 500
  },
  input: {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    transition: 'border-color 0.3s ease'
  },
  textarea: {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    minHeight: '120px',
    resize: 'vertical',
    transition: 'border-color 0.3s ease'
  },
  select: {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '1rem'
  },
  error: {
    color: 'red',
    fontSize: '0.875rem',
    marginTop: '0.25rem'
  },
  submitButton: {
    padding: '14px 30px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 500,
    transition: 'background-color 0.3s ease',
    alignSelf: 'flex-end'
  }
};

export default AddEvent;
