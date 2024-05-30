const express = require('express');
const router = express.Router();
const missionController = require('../controllers/missionController');

router.get('/start', missionController.startMissionForm);
router.post('/start', missionController.startMission);
router.post('/end/:id', missionController.endMission);
router.post('/addAgent', missionController.addAgent);
router.post('/removeAgent', missionController.removeAgent);

module.exports = router;