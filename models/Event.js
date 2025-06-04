const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Wedding', 'Birthday', 'Corporate', 'Other'],
        required: true
    },
    status: {
        type: String,
        enum: ['Planning', 'Confirmed', 'Completed', 'Cancelled'],
        default: 'Planning'
    },
    budget: {
        type: Number,
        default: 0
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    attendees: [{
        name: String,
        email: String,
        rsvp: {
            type: String,
            enum: ['Yes', 'No', 'Maybe'],
            default: 'Maybe'
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Event', eventSchema);
