const Post = require("../models/post.model");

const createPost = async (req, res, next) => {
  try {
    const {
      user,
      contentType,
      content,
      caption,
      type,
      isLikeDisable,
      isCommentDisable,
    } = req.body;

    if (!contentType || !content || !type)
      return res.err(400, "contentType, content & type are required");

    const newPost = await Post.create({
      user, // secure – taken from token
      contentType,
      content,
      caption,
      type,
      isLikeDisable,
      isCommentDisable,
    });

    res.success(201, "Post created successfully", newPost);
  } catch (err) {
    next(err);
  }
};

module.exports = { createPost };
