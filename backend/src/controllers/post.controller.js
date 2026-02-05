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

    if (!contentType || !content || !type) {
      return res.err(400, "contentType, content & type are required");
    }

    // 1️⃣ Create post
    const post = await Post.create({
      user: req.user.id, // from token
      contentType,
      content,
      caption,
      type,
      isLikeDisable,
      isCommentDisable,
    });

    // 2️⃣ Populate user before returning
    const populatedPost = await post.populate(
      "user",
      "firstName lastName profilePicture",
    );

    // 3️⃣ Send populated post
    res.success(201, "Post created successfully", populatedPost);
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
      .populate("user", "firstName profilePicture")
      .sort({ createdAt: -1 });
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

    if (!req.user) return res.err(401, "Unauthorized");

    const userId = req.user._id;
    const userName = `${req.user.firstName} ${req.user.lastName}`;
    const profilePic = req.user.profilePicture;

    const post = await Post.findById(postId);
    if (!post) return res.err(404, "Post not found");

    if (post.isLikeDisable)
      return res.err(403, "Likes are disabled for this post");

    const likeIndex = post.likes.findIndex(
      (like) => like.userId.toString() === userId.toString(),
    );

    // 🔁 UNLIKE
    if (likeIndex !== -1) {
      post.likes.splice(likeIndex, 1);
      await post.save();

      return res.success(200, "Post unliked successfully", {
        likes: post.likes,
        likesCount: post.likes.length,
      });
    }

    // ❤️ LIKE
    post.likes.push({
      userId,
      userName,
      profilePic,
    });

    await post.save();

    res.success(200, "Post liked successfully", {
      likes: post.likes,
      likesCount: post.likes.length,
    });
  } catch (err) {
    next(err);
  }
};

const getAllPostByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const posts = await Post.find({ user: userId })
      .populate("user", "userName profilePic")
      .sort({ createdAt: -1 });

    res.success(200, "User posts fetched successfully", posts);
  } catch (err) {
    next(err);
  }
};

const postComment = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { comment } = req.body;

    if (!req.user) return res.err(401, "Unauthorized");
    if (!comment?.trim()) return res.err(400, "Comment cannot be empty");

    const post = await Post.findById(postId);
    if (!post) return res.err(404, "Post not found");

    if (post.isCommentDisable)
      return res.err(403, "Comments are disabled for this post");

    const userName = `${req.user.firstName} ${req.user.lastName}`;
    const profilePic = req.user.profilePicture;

    post.comments.push({
      userId: req.user._id,
      userName,
      profilePic,
      comment,
    });

    await post.save();

    res.success(201, "Comment added successfully", {
      comments: post.comments,
      commentsCount: post.comments.length,
    });
  } catch (err) {
    next(err);
  }
};

// modifyComment, deleteComment
module.exports = {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getSinglePost,
  likeUnlikePost,
  getAllPostByUserId,
  postComment,
};
