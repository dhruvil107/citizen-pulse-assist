const mongoose = require('mongoose');

// Vote schema
const voteSchema = new mongoose.Schema({
  complaintId: { type: mongoose.Schema.Types.ObjectId, ref: 'Complaint' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  vote: { type: String, enum: ['support', 'reject'] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Vote', voteSchema);
