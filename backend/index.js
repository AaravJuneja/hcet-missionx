// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const path = require('path');
const fs = require('fs').promises;

// Import routes
const authRoutes = require('./routes/auth');
const missionRoutes = require('./routes/missions');
const communicationRoutes = require('./routes/communication');
const initializePassport = require('./models/passport-config');

const app = express();

// Database connection
mongoose.connect('mongodb://localhost:27017/hcet-missionx', { useNewUrlParser: true, useUnifiedTopology: true });

// Passport configuration
initializePassport(passport);

// Middleware setup
app.use(bodyParser.json());
app.use(cors());
app.use(flash());

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/missions', missionRoutes);
app.use('/communication', communicationRoutes);

// Dashboard route
app.get('/dashboard', async (req, res) => {
    try {
        const filePath = path.join(__dirname, '../frontend/dashboard.html');
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
        const filePath = path.join(__dirname, '../frontend', req.params.file);
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

app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
  });