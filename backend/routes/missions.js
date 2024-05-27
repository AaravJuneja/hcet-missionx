const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Mission = require('../models/mission.js');
const { updateUserRank } = require('../models/User.js');

// Create a new mission
router.post('/', async (req, res) => {
    const { title, details, agents } = req.body;
    const mission = new Mission({ title, details, agents, active: true, emergency: false });
    await mission.save();
    res.status(201).send(mission);
});

// Get active missions
router.get('/', async (req, res) => {
    const missions = await Mission.find({ active: true });
    res.send(missions);
});

// Update mission details
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { details } = req.body;
    const mission = await Mission.findByIdAndUpdate(id, { details }, { new: true });
    res.send(mission);
});

// Complete (deactivate) a mission and update agent ranks
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const mission = await Mission.findById(id);
    
    if (mission) {
        mission.active = false;
        await mission.save();

        for (const agent of mission.agents) {
            const users = await connect();
            const user = await users.findOne({ username: agent });
            if (user) {
                const completedMissions = (user.completedMissions || 0) + 1;
                await updateUserRank(agent, completedMissions);
            }
        }

        res.send(mission);
    } else {
        res.status(404).send({ error: 'Mission not found' });
    }
});

// Add an agent to a mission
router.put('/:id/add-agent', async (req, res) => {
    const { id } = req.params;
    const { agent } = req.body;
    const mission = await Mission.findByIdAndUpdate(id, { $push: { agents: agent } }, { new: true });
    res.send(mission);
});

// Remove an agent from a mission
router.put('/:id/remove-agent', async (req, res) => {
    const { id } = req.params;
    const { agent } = req.body;
    const mission = await Mission.findByIdAndUpdate(id, { $pull: { agents: agent } }, { new: true });
    res.send(mission);
});

// Impose an emergency on a mission
router.put('/:id/emergency', async (req, res) => {
    const { id } = req.params;
    const mission = await Mission.findByIdAndUpdate(id, { emergency: true }, { new: true });
    res.send(mission);
});

// Notify agents of a mission (dummy implementation)
router.post('/:id/notify', async (req, res) => {
    const { id } = req.params;
    const mission = await Mission.findById(id);
    // Add your notification logic here (e.g., send emails or messages)
    res.send({ message: `Agents notified for mission ${mission.title}` });
});

module.exports = router;