const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Mission = require('../models/mission.js');

router.post('/', async (req, res) => {
    const { title, details } = req.body;
    const mission = new Mission({ title, details, agents: [], active: true });
    await mission.save();
    res.status(201).send(mission);
});

router.get('/', async (req, res) => {
    const missions = await Mission.find({ active: true });
    res.send(missions);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { details } = req.body;
    const mission = await Mission.findByIdAndUpdate(id, { details }, { new: true });
    res.send(mission);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const mission = await Mission.findByIdAndUpdate(id, { active: false }, { new: true });
    res.send(mission);
});

module.exports = router;