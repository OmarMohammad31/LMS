const asyncHandler = require('../utils/asyncHandler');

// GET /users/me
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email, isInstructor, creditBalance } = req.user;
  res.json({ id: _id, name, email, isInstructor, creditBalance });
});

module.exports = { getMe };
