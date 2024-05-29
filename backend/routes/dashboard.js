const express = require('express');
const router = express.Router();
const Mission = require('../models/mission'); 

router.get('/', (req, res) => {
    res.sendFile('dashboard.html', { root: 'public' });
});

router.get('/missions', getMissions);
router.post('/missions', createMission);
router.put('/missions/:id', updateMission);
router.delete('/missions/:id', deleteMission);

module.exports = router;