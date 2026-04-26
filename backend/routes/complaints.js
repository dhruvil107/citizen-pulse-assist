// Complaint routes
const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const voteController = require('../controllers/voteController');


// POST /api/complaints
router.post('/', complaintController.createComplaint);

// GET /api/complaints (all complaints)
router.get('/', complaintController.getAllComplaints);

// GET /api/complaints/:id
router.get('/:id', complaintController.getComplaintById);

// GET /api/complaints/:id/votes
router.get('/:id/votes', voteController.getVotes);

module.exports = router;
