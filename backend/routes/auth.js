const express = require('express');
const bcrypt = require('bcrypt');
const connect = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const users = await connect();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: hashedPassword };
    await users.insertOne(user);
    res.status(201).json(user);
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const users = await connect();
    const user = await users.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        res.status(200).json(user);
    } else {
        res.status(400).json({ error: 'Invalid credentials' });
    }
});

module.exports = router;