const mongoose = require("mongoose");

const postScheme = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  isLikeDisable: {
    type: Boolean,
  },
  isCommentDisable: {
    type: Boolean,
  },
  likes: [
    {
      userName: { type: String, required: true },
      profilePic: { type: String, required: true },
      userId: { type: String, required: true },
    },
  ],

  comments: [
    {
      userName: { type: String, required: true },
      profilePic: { type: String, required: true },
      userId: { type: String, required: true },
      comment: { type: String, required: true },
      createdAt: { type: Date, default: Date.now() },
    },
  ],
});

const Post = mongoose.model("Post", postScheme);

module.exports = Post;
