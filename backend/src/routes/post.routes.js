const router = require("express").Router();
const authorize = require("../middleware/auth.middleware");
const {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getSinglePost,
  likeUnlikePost,
} = require("../controllers/post.controller");

router.post("/", authorize, createPost);
router.put("/:postId", authorize, updatePost);
router.delete("/:postId", authorize, deletePost);
router.get("/", authorize, getAllPosts);
router.get("/:postId", authorize, getSinglePost);
router.put("/:postId/like", authorize, likeUnlikePost);

module.exports = router;
