const jwt = require('jsonwebtoken');
const config = require('config');
exports.generateToken = userId => {
  const payload = {
    user: {
      _id: userId,
    },
  };
  return jwt.sign(payload, config.get('jwtSecret'));
};
