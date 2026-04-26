// Admin routes
const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');

// POST /api/admin/approve/:id
router.post('/approve/:id', complaintController.approveComplaint);

module.exports = router;
