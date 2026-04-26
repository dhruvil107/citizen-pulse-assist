// Vote controller
const Vote = require('../models/Vote');

// POST /api/votes
exports.createVote = async (req, res) => {
  try {
    const { complaintId, userId, vote } = req.body;
    const newVote = await Vote.create({ complaintId, userId, vote });
    res.status(201).json(newVote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/complaints/:id/votes
exports.getVotes = async (req, res) => {
  try {
    const { id } = req.params;
    const support = await Vote.countDocuments({ complaintId: id, vote: 'support' });
    const reject = await Vote.countDocuments({ complaintId: id, vote: 'reject' });
    res.json({ support, reject });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
