const User = require('../models/User');
exports.getFollowersLength = async userId => {
  const test = await User.aggregate([
    {
      $match: { _id: userId },
    },
    { $unwind: '$followers' },
    {
      $group: {
        /* execute 'grouping' */
        _id: 1 /* using the 'token' value as the _id */,
        count: { $sum: 1 } /* create a sum value */,
      },
    },
  ]);
  return test[0].count;
};

exports.getFollowingsLength = async userId => {
  const test = await User.aggregate([
    {
      $match: { _id: userId },
    },
    { $unwind: '$followings' },
    {
      $group: {
        /* execute 'grouping' */
        _id: 1 /* using the 'token' value as the _id */,
        count: { $sum: 1 } /* create a sum value */,
      },
    },
  ]);
  return test[0].count;
};

exports.replaceSpaceToUnder = str => {
  return str.replace(/ /g, '_');
};
