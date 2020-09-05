const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  avatar: {
    type: String,
  },
  password: {
    type: String,
    require: true,
  },
  followers: [{ user: { type: Schema.Types.ObjectId, ref: 'users' } }],
  followings: [{ user: { type: Schema.Types.ObjectId, ref: 'users' } }],
});

module.exports = mongoose.model('users', userSchema);
