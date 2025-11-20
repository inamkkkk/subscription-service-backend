const User = require('../models/User');
const jwtUtils = require('../utils/jwt');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    const token = jwtUtils.generateToken(user.id);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !await user.isValidPassword(password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwtUtils.generateToken(user.id);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};