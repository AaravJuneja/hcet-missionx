const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const missionRoutes = require('./routes/missions');
const communicationRoutes = require('./routes/communication');

const app = express();
mongoose.connect('mongodb://localhost:27017/hcet-missionx', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/missions', missionRoutes);
app.use('/communication', communicationRoutes);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});