const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Mission = require('../models/mission.js');
const path = require('path');
const fs = require('fs').promises;
const missionController = require('../controllers/missionController');

// POST route for creating a mission
router.post('/', async (req, res) => {
    const { title, details } = req.body;
    const mission = new Mission({ title, details, agents: [], active: true });
    await mission.save();
    res.redirect('/dashboard'); // Redirect to dashboard after mission creation
});

// GET route for retrieving active missions
router.get('/', async (req, res) => {
    const missions = await Mission.find({ active: true });
    res.send(missions);
});

// PUT route for updating a mission's details
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { details } = req.body;
    const mission = await Mission.findByIdAndUpdate(id, { details }, { new: true });
    res.redirect('/dashboard'); // Redirect to dashboard after mission update
});

// DELETE route for deactivating a mission
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const mission = await Mission.findByIdAndUpdate(id, { active: false }, { new: true });
    res.redirect('/dashboard'); // Redirect to dashboard after mission deactivation
});

// GET route for the dashboard
router.get('/dashboard', async (req, res) => {
    try {
        const filePath = path.join(__dirname, '../../frontend/dashboard.html');
        const fileContent = await fs.readFile(filePath, 'utf8');
        res.status(200).send(fileContent);
    } catch (err) {
        res.status(500).send({ error: 'Error loading dashboard page' });
    }
});

module.exports = router;