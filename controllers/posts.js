const Post = require('../models/Post');
const User = require('../models/User');
const { showErrorResponse } = require('../utils/serverErrors');
const config = require('config');
const url = config.get('domainURI');

exports.createPost = async (req, res) => {
  try {
    const { body } = req.body;
    console.log(`${url}/${req.file.path}`);
    const post = new Post({
      body,
      photo: `${url}/${req.file.path}`,
      postedBy: req.user._id,
    });
    await post.save();
    const postAfterPopulate = await Post.findById(post._id).populate(
      'postedBy',
      ['email', 'username']
    );
    return res.json({ post: postAfterPopulate });

    // await post.save();
  } catch (err) {
    return showErrorResponse(res, 500, 'Server Errors !');
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ date: -1 })
      .populate('postedBy', ['username', 'email', 'avatar']);
    return res.json({ posts });
  } catch (err) {
    return showErrorResponse(res, 500, 'Server Errors !');
  }
};

exports.getMyPosts = async (req, res) => {
  try {
    const posts = await Post.findOne({ postedBy: req.user._id });
    return res.json({ posts });
  } catch (err) {
    return showErrorResponse(res, 500, 'Server Errors');
  }
};

exports.likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    const checkUserLikes = post.likes.filter(
      like => like.user.toString() === req.user._id.toString()
    );

    if (checkUserLikes.length > 0) {
      return showErrorResponse(res, 400, 'You already liked');
    } else {
      post.likes.unshift({ user: req.user._id });
      await post.save();
      return res.json({ post });
    }
  } catch (err) {
    return showErrorResponse(res, 500, 'Server Errors');
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    const checkUserLikes = post.likes.filter(
      like => like.user.toString() === req.user._id.toString()
    );

    if (checkUserLikes.length > 0) {
      post.likes = post.likes.filter(
        like => like.user.toString() !== req.user._id.toString()
      );
      await post.save();
      return res.json({ post });
    } else {
      return showErrorResponse(res, 400, 'You has not been liked yet');
    }
  } catch (err) {
    return showErrorResponse(res, 500, 'Server Errors');
  }
};

exports.addComment = async (req, res) => {
  const { text } = req.body;
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);
    if (post) {
      post.comments.unshift({
        text,
        user: req.user._id,
        username: req.user.username,
      });
      await post.save();
      return res.json({ post });
    } else {
      return showErrorResponse(res, 400, 'Post not exists');
    }
  } catch (err) {
    return showErrorResponse(res, 500);
  }
};

exports.deleteComment = async (req, res) => {
  const { postId } = req.params;
  const { commentId } = req.params;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return showErrorResponse(res, 404, 'Post not found!');
    } else {
      const comment = post.comments.find(comment => {
        return comment._id.toString() === commentId;
      });

      if (comment.user.toString() !== req.user._id.toString()) {
        await showErrorResponse(res, 401, 'User not authorized');
      } else {
        const index = post.comments
          .map(comment => comment._id)
          .indexOf(commentId);
        post.comments.splice(index, 1);
        await post.save();
        return res.json({ post });
      }
    }
  } catch (err) {
    return showErrorResponse(res, 500);
  }
};

exports.deletePost = async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);
  try {
    if (!post) {
      return showErrorResponse(res, 400, 'Post not found!');
    } else {
      const isAuthorized = post.postedBy.toString() === req.user._id.toString();
      if (!isAuthorized)
        return showErrorResponse(res, 401, 'User not authorized !');
      await post.remove();
      return res.json({ msg: 'Delete success !' });
    }
  } catch (err) {
    return showErrorResponse(res, 500);
  }
};

exports.uploadAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    user.avatar = `${url}/${req.file.path}`;
    await user.save();
    return res.json({ user });
  } catch (err) {
    return showErrorResponse(res, 500);
  }
};
