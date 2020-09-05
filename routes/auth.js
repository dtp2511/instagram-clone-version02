const express = require('express');
const router = express.Router();
const { checkLogin, requireLogin } = require('../middlewares/auth');
const { createUser, login } = require('../controllers/auth');

// @route    GET /
// @desc
// @access   public

router.get('/auth', requireLogin, (req, res) => {
  const { _id, username, email, avatar } = req.user;
  return res.json({ user: { _id, username, email, avatar } });
});

// @route    POST
// @desc     CREATE USER
// @access   public

router.post('/signup', checkLogin, createUser);

router.post('/signin', login);
module.exports = router;
