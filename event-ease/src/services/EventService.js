class EventService {
  constructor() {
    this.EVENTS_KEY = 'events';
  }

  // Get all events from localStorage
  getAllEvents() {
    return JSON.parse(localStorage.getItem(this.EVENTS_KEY) || '[]');
  }

  // Save events to localStorage
  saveEvents(events) {
    localStorage.setItem(this.EVENTS_KEY, JSON.stringify(events));
    return events;
  }

  // Add a new event
  addEvent(event) {
    const events = this.getAllEvents();
    events.push(event);
    return this.saveEvents(events);
  }

  // Delete an event by ID
  deleteEvent(eventId) {
    const events = this.getAllEvents();
    const updatedEvents = events.filter(event => event.id !== eventId);
    return this.saveEvents(updatedEvents);
  }

  // Update an existing event
  updateEvent(updatedEvent) {
    const events = this.getAllEvents();
    const index = events.findIndex(event => event.id === updatedEvent.id);
    if (index !== -1) {
      events[index] = updatedEvent;
      return this.saveEvents(events);
    }
    return null;
  }

  // Get event by ID
  getEventById(eventId) {
    const events = this.getAllEvents();
    return events.find(event => event.id === eventId);
  }

  // Clear all events
  clearAllEvents() {
    localStorage.removeItem(this.EVENTS_KEY);
    return [];
  }
}

export default new EventService();
