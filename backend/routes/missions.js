const express = require('express');
const Mission = require('../models/Mission');

const router = express.Router();

// Create a new mission
router.post('/create', (req, res) => {
  const { name, description } = req.body;
  const newMission = new Mission(name, description);
  
  req.app.locals.db.collection('missions').insertOne(newMission, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send(result.ops[0]);
  });
});

// Get all missions
router.get('/', (req, res) => {
  req.app.locals.db.collection('missions').find().toArray((err, items) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(items);
  });
});

module.exports = router;