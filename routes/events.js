const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Get all events
router.get('/', auth, async (req, res) => {
    try {
        const events = await Event.find()
            .populate('organizer', 'username email')
            .sort({ createdAt: -1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get user's events
router.get('/my-events', auth, async (req, res) => {
    try {
        const events = await Event.find({ organizer: req.user.id })
            .populate('organizer', 'username email')
            .sort({ createdAt: -1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create an event
router.post('/', [auth, admin], async (req, res) => {
    try {
        const event = new Event({
            ...req.body,
            organizer: req.user.id
        });

        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get single event
router.get('/:id', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate('organizer', 'username email');
        
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update event
router.put('/:id', [auth, admin], async (req, res) => {
    try {
        let event = await Event.findById(req.params.id);
        
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Only allow organizer to update their own event
        if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized' });
        }

        event = await Event.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete event
router.delete('/:id', [auth, admin], async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Only allow organizer to delete their own event
        if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await event.remove();
        res.json({ message: 'Event removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add attendee to event
router.post('/:eventId/attendees', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);
        
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const { name, email } = req.body;
        
        // Check if attendee already exists
        const existingAttendee = event.attendees.find(a => a.email === email);
        if (existingAttendee) {
            return res.status(400).json({ message: 'Attendee already exists' });
        }

        event.attendees.push({ name, email });
        await event.save();
        
        res.json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update attendee RSVP
router.put('/:eventId/attendees/:attendeeId', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);
        
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const attendee = event.attendees.id(req.params.attendeeId);
        if (!attendee) {
            return res.status(404).json({ message: 'Attendee not found' });
        }

        attendee.rsvp = req.body.rsvp;
        await event.save();
        
        res.json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
