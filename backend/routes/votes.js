// Vote routes
const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');

// POST /api/votes
router.post('/', voteController.createVote);

module.exports = router;
