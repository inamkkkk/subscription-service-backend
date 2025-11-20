const Subscription = require('../models/Subscription');
const paymentProcessor = require('../utils/paymentProcessor');

const subscriptionTiers = [
  { id: 'basic', name: 'Basic', price: 10 },
  { id: 'premium', name: 'Premium', price: 20 },
  { id: 'enterprise', name: 'Enterprise', price: 50 },
];

exports.getSubscriptionTiers = (req, res) => {
  res.json(subscriptionTiers);
};

exports.subscribe = async (req, res) => {
  try {
    const { tierId } = req.body;
    const userId = req.user.id;

    const tier = subscriptionTiers.find(t => t.id === tierId);
    if (!tier) {
      return res.status(400).json({ message: 'Invalid tier' });
    }

    const paymentResult = await paymentProcessor.processPayment(tier.price);
    if (!paymentResult.success) {
      return res.status(400).json({ message: 'Payment failed' });
    }

    const subscription = new Subscription({
      userId: userId,
      tierId: tierId,
      startDate: new Date(),
    });

    await subscription.save();

    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSubscriptionStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const subscription = await Subscription.findOne({ userId });

    if (!subscription) {
      return res.status(404).json({ message: 'No active subscription found' });
    }

    const tier = subscriptionTiers.find(t => t.id === subscription.tierId);

    res.json({
      tier: tier,
      startDate: subscription.startDate,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};