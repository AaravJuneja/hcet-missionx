// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const authRoutes = require('./routes/auth');
const missionRoutes = require('./routes/missions');
const communicationRoutes = require('./routes/communication');
const initializePassport = require('./models/passport-config');

const app = express();
mongoose.connect('mongodb://localhost:27017/hcet-missionx', { useNewUrlParser: true, useUnifiedTopology: true });

initializePassport(passport);

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

app.use('/auth', authRoutes);
app.use('/missions', missionRoutes);
app.use('/communication', communicationRoutes);

app.get('/', (req, res) => {
    res.send('Home Page');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});