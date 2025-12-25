const Post = require("../models/post.model");

const createPost = async (req, res, next) => {
  try {
    const {
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
      user: req.user.id, // secure – taken from token
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

const updatePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const { content, caption, isLikeDisable, isCommentDisable } = req.body;

    const post = await Post.findById(postId);
    if (!post) return res.err(404, "Post not found");

    if (post.user.toString() !== userId)
      return res.err(403, "You are not allowed to update this post");

    if (content !== undefined) post.content = content;
    if (caption !== undefined) post.caption = caption;
    if (isLikeDisable !== undefined) post.isLikeDisable = isLikeDisable;
    if (isCommentDisable !== undefined)
      post.isCommentDisable = isCommentDisable;

    await post.save();

    res.success(200, "Post updated successfully", post);
  } catch (err) {
    next(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) return res.err(404, "Post not found");

    if (post.user.toString() !== userId)
      return res.err(403, "You are not allowed to delete this post");

    await Post.findByIdAndDelete(postId);

    res.success(200, "Post deleted successfully");
  } catch (err) {
    next(err);
  }
};

module.exports = { createPost, updatePost, deletePost };
