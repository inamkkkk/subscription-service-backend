const jwt = require('jsonwebtoken');
const secretKey = 'yourSecretKey'; // Replace with a strong, environment-specific secret

exports.generateToken = (userId) => {
  return jwt.sign({ id: userId }, secretKey, { expiresIn: '1h' });
};

exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey, );
  } catch (error) {
    throw new Error('Invalid token');
  }
};