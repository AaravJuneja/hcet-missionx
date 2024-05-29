const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    details: { type: String, required: true },
    agents: { type: [String], required: true },
    active: { type: Boolean, default: true },
    completed: { type: Number, default: 0 }
});

module.exports = mongoose.model('Mission', missionSchema);