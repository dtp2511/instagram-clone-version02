const express = require('express');
const router = express.Router();
const { requireLogin } = require('../middlewares/auth');
const { replaceSpaceToUnder } = require('../utils');
const {
  createPost,
  getPosts,
  getMyPosts,
  likePost,
  unlikePost,
  addComment,
  deleteComment,
  deletePost,
  uploadAvatar,
} = require('../controllers/posts');
const { checkPost, checkImg } = require('../middlewares/posts');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + replaceSpaceToUnder(file.originalname));
  },
});
const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
});

// @route    POST /
// @desc     CREATE POST
// @access   public
router.post(
  '/create-post',
  requireLogin,
  upload.single('photo'),
  checkPost,
  createPost
);

// @route    POST /
// @desc     UPLOAD PROFILE IMG
// @access   public
router.put(
  '/uploadproimg',
  requireLogin,
  upload.single('photo'),
  checkImg,
  uploadAvatar
);

// @route    GET /
// @desc     GET ALL POST
// @access   public

router.get('/posts', getPosts);

// @route    GET /
// @desc     GET MY POST
// @access   public

router.get('/myposts', requireLogin, getMyPosts);
module.exports = router;

// @route    PUT /
// @desc     UNLIKE POST
// @access   public
router.put('/like/:id', requireLogin, likePost);

// @route    PUT /
// @desc     UNLIKE POST
// @access   public
router.put('/unlike/:id', requireLogin, unlikePost);

// @route    PUT /
// @desc     ADD COMMENT
// @access   public

router.put('/comment/:postId', requireLogin, addComment);

// @route    DELETE /
// @desc     DELETE POST
// @access   public

router.delete('/post/:postId', requireLogin, deletePost);

// @route    DELETE /
// @desc     DELETE COMMENT
// @access   public

router.delete('/comment/:postId/:commentId', requireLogin, deleteComment);
