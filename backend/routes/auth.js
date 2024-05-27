const express = require('express');
const router = express.Router();
const passport = require('passport');
const connectUsers = require('../models/User');

// Register route using Passport.js
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const users = await connectUsers();
    const existingUser = await users.findOne({ username });

    if (existingUser) {
        return res.status(400).send({ error: 'Username already exists' });
    }

    const newUser = new User({ username, password, role: 'Agent' });

    await newUser.save();

    res.redirect('/login');
});

// Login route using Passport.js local strategy
router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard', // Redirect to dashboard on successful login
    failureRedirect: '/login',      // Redirect to login page on failed login
    failureFlash: true              // Enable flash messages for authentication failures
}));

module.exports = router;
