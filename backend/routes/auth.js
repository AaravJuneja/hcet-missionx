const express = require('express');
const router = express.Router();
const connectUsers = require('../models/User');

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const users = await connectUsers();
    const existingUser = await users.findOne({ username });

    if (existingUser) {
        return res.status(400).send({ error: 'Username already exists' });
    }

    await users.insertOne({ username, password, role: 'Agent' });
    res.status(201).send({ message: 'Registration successful' });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const users = await connectUsers();
    const user = await users.findOne({ username, password });

    if (!user) {
        return res.status(401).send({ error: 'Invalid credentials' });
    }

    res.send({ message: 'Login successful' });
});

module.exports = router;