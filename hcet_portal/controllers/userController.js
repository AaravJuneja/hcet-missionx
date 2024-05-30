const { Agent } = require('../models');
const bcrypt = require('bcryptjs');
const logger = require('../config/logger');

exports.registerForm = (req, res) => {
    res.render('user/register');
};

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await Agent.create({ name, email, password: hashedPassword, role: 'agent' });
        res.redirect('/users/login');
    } catch (error) {
        req.flash('error', 'Registration failed');
        res.redirect('/users/register');
    }
};

exports.loginForm = (req, res) => {
    res.render('user/login');
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const agent = await Agent.findOne({ where: { email } });
        if (agent && await bcrypt.compare(password, agent.password)) {
            req.session.agentId = agent.id;
            res.redirect('/missions');
        } else {
            req.flash('error', 'Invalid credentials');
            res.redirect('/users/login');
        }
    } catch (error) {
        req.flash('error', 'Login failed');
        res.redirect('/users/login');
    }
};