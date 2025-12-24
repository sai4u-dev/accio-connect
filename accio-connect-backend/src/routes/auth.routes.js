const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const { signUp, signIn, profile } = require("../controllers/auth.controller");

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.get("/profile", auth, profile);

module.exports = router;
