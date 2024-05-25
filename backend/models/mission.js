const mongoose = require('mongoose');

const MissionSchema = new mongoose.Schema({
    title: String,
    details: String,
    agents: [String],
    active: Boolean
});

module.exports = mongoose.model('Mission', MissionSchema);