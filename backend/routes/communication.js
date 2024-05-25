const express = require('express');
const router = express.Router();
const messages = [];

router.post('/', (req, res) => {
    const { message, sender } = req.body;
    const newMessage = { message, sender, timestamp: new Date() };
    messages.push(newMessage);
    res.status(201).send(newMessage);
});

router.get('/', (req, res) => {
    res.send(messages);
});

module.exports = router;
