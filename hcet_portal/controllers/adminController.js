const { Mission, Agent } = require('../models');
const logger = require('../config/logger');

exports.dashboard = async (req, res) => {
    try {
        const missions = await Mission.findAll();
        const agents = await Agent.findAll();
        res.render('admin/dashboard', { missions, agents });
    } catch (error) {
        req.flash('error', 'Failed to load dashboard');
        res.redirect('/');
    }
};