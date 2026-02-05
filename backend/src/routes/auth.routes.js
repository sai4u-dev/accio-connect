const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const {
  signup,
  signin,
  profile,
  logout,
  me,
  getAllUsers,
} = require("../controllers/auth.controller");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);
router.get("/profile", auth, profile);
router.get("/me", auth, me);
router.use("/getallusers", auth, getAllUsers);

module.exports = router;
