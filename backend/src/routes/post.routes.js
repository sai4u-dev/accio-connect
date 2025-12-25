const router = require("express").Router();
const authorize = require("../middleware/auth.middleware");
const {
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/post.controller");

router.post("/", authorize, createPost);
router.put("/:postId", authorize, updatePost);
router.delete("/:postId", authorize, deletePost);

module.exports = router;
