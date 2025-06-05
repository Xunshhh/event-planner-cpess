import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronLeft, 
  faChevronRight,
  faClock,
  faMapMarkerAlt,
  faTags
} from '@fortawesome/free-solid-svg-icons';
import './Calendar.css';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  
  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    if (!Array.isArray(savedEvents)) {
      localStorage.setItem('events', JSON.stringify([]));
      setEvents([]);
    } else {
      setEvents(savedEvents);
    }
  }, []);

  useEffect(() => {
    
    const savedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    setEvents(savedEvents);
  }, []);

  
  const getMonthName = (date) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[date.getMonth()];
  };

  const getDayName = (date) => {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return dayNames[date.getDay()];
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDay = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const hasEvent = (day, month, year) => {
    return events.some(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day &&
             eventDate.getMonth() === month &&
             eventDate.getFullYear() === year;
    });
  };

  const handlePrevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const handleDayClick = (day) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(newDate);
  };

 
  const days = [];
  const firstDay = getFirstDay(currentMonth);
  const daysInMonth = getDaysInMonth(currentMonth);

  
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day" />);
  }

  
  for (let day = 1; day <= daysInMonth; day++) {
    const hasEventToday = hasEvent(day, currentMonth.getMonth(), currentMonth.getFullYear());
    const isSelected = 
      day === selectedDate.getDate() &&
      currentMonth.getMonth() === selectedDate.getMonth() &&
      currentMonth.getFullYear() === selectedDate.getFullYear();

    days.push(
      <div
        key={day}
        className={`calendar-day ${hasEventToday ? 'has-event' : ''} ${isSelected ? 'selected' : ''}`}
        onClick={() => handleDayClick(day)}
      >
        <div className="day-number">{day}</div>
        {hasEventToday && (
          <div className="event-dot" title="Events today">
            <FontAwesomeIcon icon={faTags} size="xs" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="dashboard-calendar">
      <div className="calendar-header">
        <h2>{getMonthName(currentMonth)} {currentMonth.getFullYear()}</h2>
        <div className="calendar-controls">
          <button className="calendar-btn" onClick={handlePrevMonth}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button className="calendar-btn" onClick={handleNextMonth}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>

      <div className="calendar-grid">
        <div className="calendar-row">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="calendar-day-header">
              {day}
            </div>
          ))}
        </div>
        {days.map((day, index) => (
          <div key={index} className="calendar-row">
            {day}
          </div>
        ))}
      </div>

      <div className="events-list">
        <h3>Events for {getMonthName(selectedDate)} {selectedDate.getFullYear()}</h3>
        {events
          .filter(event => {
            const eventDate = new Date(event.date);
            const day = eventDate.getDate();
            const month = eventDate.getMonth();
            const year = eventDate.getFullYear();
            
            return month === selectedDate.getMonth() &&
                   year === selectedDate.getFullYear() &&
                   day === selectedDate.getDate();
          })
          .sort((a, b) => {
            
            const timeA = a.time || '00:00';
            const timeB = b.time || '00:00';
            return timeA.localeCompare(timeB);
          })
          .map((event, index) => (
            <div key={index} className="event-item">
              <div className="event-date">
                <FontAwesomeIcon icon={faClock} />
                {event.time ? `${event.time} - ` : ''}
                {event.title}
              </div>
              <div className="event-location">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                {event.location}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};



export default Calendar;
