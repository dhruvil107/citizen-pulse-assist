// User routes
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Example: POST /api/users (add more as needed)
router.post('/', userController.createUser);

module.exports = router;
