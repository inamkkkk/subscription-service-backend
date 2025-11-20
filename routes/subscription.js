const express = require('express');
const subscriptionController = require('../controllers/subscriptionController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/tiers', subscriptionController.getSubscriptionTiers);
router.post('/subscribe', authMiddleware, subscriptionController.subscribe);
router.get('/status', authMiddleware, subscriptionController.getSubscriptionStatus);

module.exports = router;