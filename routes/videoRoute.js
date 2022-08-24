const express = require('express');
const videoController = require('../controllers/videoController');
const router = express.Router();

router.get('/get/:page?', videoController.getVideos);

module.exports = router;
