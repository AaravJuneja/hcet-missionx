const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const authRoutes = require('./routes/auth');
const missionRoutes = require('./routes/missions');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = 'mongodb://localhost:27017/hcet_missionx';

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/missions', missionRoutes);

// Connect to MongoDB and start server
MongoClient.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    app.locals.db = client.db();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => console.error(error));