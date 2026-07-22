const router = require('express').Router();
const { getMe } = require('../controllers/userController');
const { requireAuth } = require('../middleware/auth');

router.get('/me', requireAuth, getMe);

module.exports = router;
