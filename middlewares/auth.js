const { check, validationResult } = require('express-validator');
const { showErrorResponse } = require('../utils/serverErrors');
const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
exports.checkLogin = [
  check('username')
    .notEmpty()
    .withMessage('Username must be required'),
  check('password')
    .notEmpty()
    .withMessage('Password must be required')
    .isLength({ min: 6 })
    .withMessage('Password must be more than 6'),
  check('email')
    .notEmpty()
    .withMessage('Email must be required')
    .notEmpty()
    .withMessage('Email is not valid'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(404).json({ errors: errors.array() });
    }
    next();
  },
];

exports.requireLogin = async (req, res, next) => {
  const token = req.headers.bearer;
  if (!token)
    return res
      .status(401)
      .json({ errors: [{ msg: 'You have to sign in first' }] });
  const decoded = jwt.verify(token, config.get('jwtSecret'));
  const id = decoded.user._id;
  const user = await User.findById(id);
  if (!user)
    return res.status(404).json({ errors: [{ msg: 'User is not exists' }] });
  req.user = user;
  next();
};

// middleware to check for a valid object id
exports.checkObjectId = idToCheck => (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[idToCheck]))
    return showErrorResponse(res, 400, 'Invalid Id');
  next();
};

exports.isAuth = async (req, res, next) => {
  const token = req.headers.bearer;
  if (!token) return next();
  const decoded = jwt.verify(token, config.get('jwtSecret'));
  const id = decoded.user._id;
  const user = await User.findById(id);
  req.user = user;
  next();
};
