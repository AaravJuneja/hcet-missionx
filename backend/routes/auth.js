const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const router = express.Router();
const connectUsers = require('../models/User');

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const users = await connectUsers();
    const existingUser = await users.findOne({ username });

    if (existingUser) {
        return res.status(400).send({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await users.insertOne({ username, password: hashedPassword, role: 'Agent' });

    res.status(201).send({ message: 'Registration successful' });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard', // Redirect to dashboard on successful login
    failureRedirect: '/login',     // Redirect to login page on failed login
    failureFlash: true             // Enable flash messages for authentication failures
}));

module.exports = router;