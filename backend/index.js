// Load environment variables from .env file
require('dotenv').config();

import express from 'express';
import { connect } from 'mongoose';
import { json } from 'body-parser';
import cors from 'cors';
import passport, { initialize, session as _session } from 'passport';
import session from 'express-session';
import flash from 'express-flash';
import { join } from 'path';
import { promises as fs } from 'fs';

// Import routes
import authRoutes from './routes/auth';
import missionRoutes from './routes/missions';
import communicationRoutes from './routes/communication';
import initializePassport from './models/passport-config';

const app = express();

// Database connection
connect('mongodb://localhost:27017/hcet-missionx', { useNewUrlParser: true, useUnifiedTopology: true });

// Passport configuration
initializePassport(passport);

// Middleware setup
app.use(json());
app.use(cors());
app.use(flash());

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));

app.use(initialize());
app.use(_session());

// Routes
app.use('/auth', authRoutes);
app.use('/missions', missionRoutes);
app.use('/communication', communicationRoutes);

// Dashboard route
app.get('/dashboard', async (req, res) => {
    try {
        const filePath = join(__dirname, '../frontend/dashboard.html');
        const fileContent = await fs.readFile(filePath, 'utf8');
        res.status(200).send(fileContent);
    } catch (err) {
        res.status(500).send({ error: 'Error loading dashboard page' });
    }
});

// Root route
app.get('/', (req, res) => {
    res.send('Home Page');
});

// Serve frontend files for other routes if needed
app.get('/frontend/:file', async (req, res) => {
    try {
        const filePath = join(__dirname, '../frontend', req.params.file);
        const fileContent = await fs.readFile(filePath, 'utf8');
        res.status(200).send(fileContent);
    } catch (err) {
        res.status(404).send({ error: 'File not found' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});