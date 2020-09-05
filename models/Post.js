const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = Schema({
  //title , body , photo , postedBy
  title: {
    type: String,
    require: true,
  },
  body: {
    type: String,
    require: true,
  },
  photo: {
    type: String,
    require: true,
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  likes: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' } }],
  date: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
      text: {
        type: String,
        require: true,
      },
      username: {
        type: String,
        require: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model('posts', postSchema);
