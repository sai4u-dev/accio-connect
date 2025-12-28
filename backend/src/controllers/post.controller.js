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

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate("user", "userName profilePic")
      .sort({ createdAt: -1 });
    console.log(posts);

    res.success(200, "Posts fetched successfully", posts);
  } catch (err) {
    next(err);
  }
};

const getSinglePost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) return res.err(404, "Post not found");

    res.success(200, "Post fetched successfully", post);
  } catch (err) {
    next(err);
  }
};

const likeUnlikePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { id, userName, profilePic } = req.user;

    const post = await Post.findById(postId);
    if (!post) return res.err(404, "Post not found");

    if (post.isLikeDisable)
      return res.err(403, "Likes are disabled for this post");

    const likeIndex = post.likes.findIndex((like) => like.userId === id);

    if (likeIndex !== -1) {
      // UNLIKE
      post.likes.splice(likeIndex, 1);
      await post.save();

      return res.success(200, "Post unliked successfully", {
        likesCount: post.likes.length,
      });
    }

    // LIKE
    post.likes.push({
      userId: id,
      userName,
      profilePic,
    });

    await post.save();

    res.success(200, "Post liked successfully", {
      likesCount: post.likes.length,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getSinglePost,
  likeUnlikePost,
};
