const router = require("express").Router();
const authorize = require("../middleware/auth.middleware");
const {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getSinglePost,
  likeUnlikePost,
  getAllPostByUserId,
  postComment,
} = require("../controllers/post.controller");

router.post("/", authorize, createPost);
router.put("/:postId", authorize, updatePost);
router.delete("/:postId", authorize, deletePost);
router.get("/", getAllPosts); //should be authorize
router.post("/:postId/comment", authorize, postComment);
router.put("/:postId/like", authorize, likeUnlikePost);
router.get("/user/:userId", authorize, getAllPostByUserId);
router.get("/:postId", authorize, getSinglePost);

module.exports = router;
