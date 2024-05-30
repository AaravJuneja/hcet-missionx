const Mission = require('../models/mission');

exports.getAllMissions = async (req, res) => {
    try {
        const missions = await Mission.find();
        res.json(missions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch missions' });
    }
};

exports.createMission = async (req, res) => {
    try {
        const { title, details, agents } = req.body;
        const newMission = new Mission({ title, details, agents, active: true, completed: 0 });
        await newMission.save();
        res.status(201).json(newMission);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create mission' });
    }
};

exports.updateMission = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, details, agents } = req.body;
        const updatedMission = await Mission.findByIdAndUpdate(id, { title, details, agents }, { new: true });
        res.json(updatedMission);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update mission' });
    }
};

exports.deleteMission = async (req, res) => {
    try {
        const { id } = req.params;
        await Mission.findByIdAndDelete(id);
        res.json({ message: 'Mission deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete mission' });
    }
};

exports.endMission = async (req, res) => {
    try {
        const { id } = req.params;
        const mission = await Mission.findById(id);
        if (!mission) {
            return res.status(404).json({ error: 'Mission not found' });
        }
        mission.active = false;
        mission.completed += 1;
        await mission.save();
        res.json(mission);
    } catch (error) {
        res.status(500).json({ error: 'Failed to end mission' });
    }
};

exports.addAgent = async (req, res) => {
    try {
        const { id } = req.params;
        const { agent } = req.body;
        const mission = await Mission.findById(id);
        if (!mission) {
            return res.status(404).json({ error: 'Mission not found' });
        }
        mission.agents.push(agent);
        await mission.save();
        res.json(mission);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add agent' });
    }
};

exports.removeAgent = async (req, res) => {
    try {
        const { id } = req.params;
        const { agent } = req.body;
        const mission = await Mission.findById(id);
        if (!mission) {
            return res.status(404).json({ error: 'Mission not found' });
        }
        mission.agents = mission.agents.filter(a => a !== agent);
        await mission.save();
        res.json(mission);
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove agent' });
    }
};

exports.imposeEmergency = async (req, res) => {
    try {
        const { id } = req.params;
        const mission = await Mission.findById(id);
        if (!mission) {
            return res.status(404).json({ error: 'Mission not found' });
        }
        res.json({ message: `Emergency imposed on mission: ${mission.title}` });
    } catch (error) {
        res.status(500).json({ error: 'Failed to impose emergency' });
    }
};

exports.notifyAgents = async (req, res) => {
    try {
        const { id } = req.params;
        const mission = await Mission.findById(id);
        if (!mission) {
            return res.status(404).json({ error: 'Mission not found' });
        }
        res.json({ message: `Agents notified for mission: ${mission.title}` });
    } catch (error) {
        res.status(500).json({ error: 'Failed to notify agents' });
    }
};