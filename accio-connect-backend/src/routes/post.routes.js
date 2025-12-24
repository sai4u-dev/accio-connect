const router = require("express").Router();
const authorize = require("../middleware/auth.middleware");
const { createPost } = require("../controllers/post.controller");

router.post("/", authorize, createPost);

module.exports = router;
