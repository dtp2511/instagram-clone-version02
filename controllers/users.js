const User = require('../models/User');
const Post = require('../models/Post');
const { showErrorResponse } = require('../utils/serverErrors');

exports.addFollowers = async (req, res) => {
  const { followId } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { _id: followId },
      { $push: { followers: { user: req.user._id } } },
      { new: true }
    );
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { followings: { user: followId } } },
      { new: true }
    );

    return res.json({ user });
  } catch (err) {
    if (err.kind === 'ObjectId')
      return showErrorResponse(res, 404, 'User not found');
    return showErrorResponse(res, 500);
  }
};

exports.unFollowers = async (req, res) => {
  const { unFollowId } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { _id: unFollowId },
      { $pull: { followers: { user: req.user._id } } },
      { new: true }
    );
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { followings: { user: unFollowId } } },
      { new: true }
    );

    return res.json({ user });
  } catch (err) {
    if (err.kind === 'ObjectId')
      return showErrorResponse(res, 404, 'User not found');
    return showErrorResponse(res, 500);
  }
};

exports.getAllUserInfo = async (req, res) => {
  const { followId } = req.body;
  const a = await User.find({
    followings: {
      $elemMatch: { user: { $exists: followId } },
    },
  });
  console.log(a);
  // const { followId } = req.body;
  // const user = await User.find({ _id: req.user._id }).exists({
  //   email: 'kekone@gmail.com',
  // });
  // return res.json({ user });
  // let isFollow;
  // await User.find({
  //   _id: req.user._id,
  //   'followings.user': followId,
  // })
  //   .then(value => (isFollow = true))
  //   .catch(err => (isFollow = false));
  // return res.json({ isFollow });
};

// var mongoose = require("mongoose");
// var empid = mongoose.Types.ObjectId("54a0d4c5bffabd6a179834eb");

//     Availability.aggregate()
//         .match( { employee_id : empid, currDate: "2014-12-28T18:30:00Z" } )
//         .group({_id : "$employee_id",count: { $sum: 1 }})
//         .exec(function (err, response) {
//             if (err) console.log(err);
//                 res.json({"message": "success", "data": response, "status_code": "200"});
//             }
//     );

// football.find(
//   { "awards.award": "Golden Boot", "awards.numberOfTimes": 6 },
//   function(err, result) {
//     if (err) {
//       res.send(err);
//     } else {
//       res.json(result);
//     }
//   }
// );

exports.getUserInfo = async (req, res) => {
  const { userId } = req.params;
  let isFollowing = false;
  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return showErrorResponse(res, 404, 'User not found');
    } else {
      const ownPost = await Post.find({ postedBy: userId });
      // kiểm tra user đăng nhập có đang follow không
      if (req.user && req.user._id) {
        isFollowing = user.followers
          .map(follower => follower.user)
          .includes(req.user._id.toString());
      }
      return res.json({ posts: ownPost, user, isFollowing });
    }
  } catch (err) {
    return showErrorResponse(res, 500);
  }
};

// const test = await User.aggregate([
//   {
//     $match: { _id: new mongoose.Types.ObjectId(userId) },
//   },
//   { $unwind: '$followers' },
//   {
//     $match: {
//       'followers.user': new mongoose.Types.ObjectId(
//         '5f4dd45b60921f7da387c366'
//       ),
//     },
//   },
//   {
//     $group: {
//       _id: '$followers.user',
//       count: { $sum: 1 },
//     },
//   },
// ]);
