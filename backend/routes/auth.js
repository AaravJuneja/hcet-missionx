const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User(username, hashedPassword);
  
  req.app.locals.db.collection('users').insertOne(newUser, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send(result.ops[0]);
  });
});

// Login user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await req.app.locals.db.collection('users').findOne({ username });

  if (user && await bcrypt.compare(password, user.password)) {
    res.status(200).send(user);
  } else {
    res.status(401).send('Invalid credentials');
  }
});

module.exports = router;