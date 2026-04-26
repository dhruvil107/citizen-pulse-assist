const mongoose = require('mongoose');

// User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  latitude: Number,
  longitude: Number,
});

module.exports = mongoose.model('User', userSchema);
