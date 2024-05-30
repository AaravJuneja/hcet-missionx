const { Mission, Agent } = require('../models');
const logger = require('../config/logger');
const { getWeather } = require('../services/weatherService');

exports.startMissionForm = (req, res) => {
    res.render('mission/start', { agents: [] });
};

exports.startMission = async (req, res) => {
    const { missionName, description, agents } = req.body;
    try {
        const mission = await Mission.create({ name: missionName, description, status: 'active' });
        await mission.addAgents(agents);
        res.redirect('/missions');
    } catch (error) {
        req.flash('error', 'Failed to start mission');
        res.redirect('/missions/start');
    }
};

exports.endMission = async (req, res) => {
    const { id } = req.params;
    try {
        await Mission.update({ status: 'completed' }, { where: { id } });
        res.redirect('/missions');
    } catch (error) {
        req.flash('error', 'Failed to end mission');
        res.redirect('/missions');
    }
};

exports.addAgent = async (req, res) => {
    const { missionId, agentId } = req.body;
    try {
        const mission = await Mission.findByPk(missionId);
        const agent = await Agent.findByPk(agentId);
        await mission.addAgent(agent);
        res.redirect(`/missions/${missionId}`);
    } catch (error) {
        req.flash('error', 'Failed to add agent');
        res.redirect(`/missions/${missionId}`);
    }
};

exports.removeAgent = async (req, res) => {
    const { missionId, agentId } = req.body;
    try {
        const mission = await Mission.findByPk(missionId);
        const agent = await Agent.findByPk(agentId);
        await mission.removeAgent(agent);
        res.redirect(`/missions/${missionId}`);
    } catch (error) {
        req.flash('error', 'Failed to remove agent');
        res.redirect(`/missions/${missionId}`);
    }
};

exports.startMissionForm = async (req, res) => {
    const agents = await Agent.findAll();
    const weather = await getWeather('India');
    res.render('mission/start', { agents, weather });
};