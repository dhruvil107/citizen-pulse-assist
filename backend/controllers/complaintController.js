// GET /api/complaints (all complaints)
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// GET /api/complaints/:id (accepts either Mongo _id or numeric complaintId)
exports.getComplaintById = async (req, res) => {
  try {
    let complaint = null;
    if (/^[0-9]+$/.test(req.params.id)) {
      // Numeric complaintId
      complaint = await Complaint.findOne({ complaintId: Number(req.params.id) });
    } else {
      // Fallback to Mongo _id
      complaint = await Complaint.findById(req.params.id);
    }
    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Complaint controller
const Complaint = require('../models/Complaint');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Haversine formula for distance calculation
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// POST /api/complaints
exports.createComplaint = async (req, res) => {
  try {
    const { userId, title, description, latitude, longitude } = req.body;
    // Generate a unique numeric complaintId (auto-increment)
    const lastComplaint = await Complaint.findOne({}, {}, { sort: { complaintId: -1 } });
    const nextComplaintId = lastComplaint && lastComplaint.complaintId ? lastComplaint.complaintId + 1 : 100000;
    const complaint = await Complaint.create({ userId, title, description, latitude, longitude, complaintId: nextComplaintId });
    // Find users within 5km
    const users = await User.find();
    const nearbyUsers = users.filter(u => getDistanceFromLatLonInKm(latitude, longitude, u.latitude, u.longitude) <= 5);
    // Send email notifications
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    for (const user of nearbyUsers) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'New Complaint Near You',
        text: `A new complaint has been filed near your location: ${title}\n${description}`,
      });
    }
    res.status(201).json(complaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/admin/approve/:id
exports.approveComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'approved' or 'rejected'
    const updated = await Complaint.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
