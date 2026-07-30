const router = require('express').Router();
const { createRequest, listRequests, acceptRequest, confirmRequest, listAllRequests } = require('../controllers/tutoringController');
const { requireAuth } = require('../middleware/auth');


router.post('/', requireAuth, createRequest);
router.get('/', requireAuth, listRequests);
router.get('/all', requireAuth, listAllRequests);
router.post('/:id/accept', requireAuth, acceptRequest);
router.post('/:id/confirm', requireAuth, confirmRequest);

module.exports = router;
