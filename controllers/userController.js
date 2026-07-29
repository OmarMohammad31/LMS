const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User');

// GET /users/me
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email, isInstructor, creditBalance } = req.user;
  res.json({ id: _id, name, email, isInstructor, creditBalance });
});

// GET /users (List all registered users)
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}, '-passwordHash');
  res.json(users);
});

module.exports = { getMe, getAllUsers };
