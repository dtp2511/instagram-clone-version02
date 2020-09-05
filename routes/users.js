const { requireLogin, checkObjectId, isAuth } = require('../middlewares/auth');
const {
  addFollowers,
  unFollowers,
  getFollowersLength,
  getAllUserInfo,
  getUserInfo,
} = require('../controllers/users');
const express = require('express');
const router = express.Router();

router.put('/follow', requireLogin, addFollowers);
router.put('/unfollow', requireLogin, unFollowers);
router.put('/getuserfollow', requireLogin, getAllUserInfo);
router.get(
  '/getuserinfo/:userId',
  checkObjectId('userId'),
  isAuth,
  getUserInfo
);
module.exports = router;
