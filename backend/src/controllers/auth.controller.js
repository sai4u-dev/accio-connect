const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { LOCATION, COURSE_TYPE, ALL_BATCH } = require("../constants");
const { signupLog } = require("../logfunctions/signup");

const cookieName = "accioConnectToken";

// ----------------- SIGNUP -----------------
const signup = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      profilePicture: image_Url,
      batch,
      location,
      courseType,
    } = req.body;

    // Validation
    if (!ALL_BATCH[batch]) return res.err(400, "Given batch doesn't exist");
    if (!LOCATION.includes(location))
      return res.err(400, "Centre not present in given location");
    if (!COURSE_TYPE.includes(courseType))
      return res.err(400, "Course type invalid");
    if (!firstName || !email || !password || !phoneNumber)
      return res.err(400, "All required fields are needed");
    if (await User.findOne({ email }))
      return res.err(409, "Email already used");
    if (await User.findOne({ phoneNumber }))
      return res.err(409, "Phone already used");

    const hashed = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashed,
      batch,
      location,
      courseType,
      profilePicture: image_Url,
      sessions: [], // Initialize sessions array
    });

    signupLog(
      `${firstName} ${lastName} ${email} ${new Date().toLocaleString()}`,
    );

    const { password: _, ...safeUser } = user.toObject();
    res.success(201, "User registered", safeUser);
  } catch (err) {
    next(err);
  }
};

// ----------------- SIGNIN -----------------
const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.err(400, "Enter email & password");

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.err(404, "User not found");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.err(401, "Invalid credentials");

    // Update lastLogin and add a session
    const session = {
      login: new Date(),
      device: req.headers["user-agent"] || "Unknown",
    };
    user.lastLogin = new Date();
    user.sessions.push(session);
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie(cookieName, token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { password: _, ...safeUser } = user.toObject();
    res.success(200, "Login success", safeUser);
  } catch (err) {
    next(err);
  }
};

// ----------------- LOGOUT -----------------
const logout = async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findById(req.user._id);

      // Update last session logout
      const lastSession = user.sessions[user.sessions.length - 1];
      if (lastSession && !lastSession.logout) lastSession.logout = new Date();

      // Update lastLogout field
      user.lastLogout = new Date();
      await user.save();
    }

    res.clearCookie(cookieName, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.success(200, "Logout successful");
  } catch (err) {
    next(err);
  }
};

// ----------------- PROFILE -----------------
const profile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.err(404, "User not found");
    res.success(200, "Profile fetched", user);
  } catch (err) {
    next(err);
  }
};

// ----------------- UPDATE PROFILE -----------------
const updateProfile = async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber, location } = req.body;
    const profilePicture = req.file ? req.file.path : req.body.profilePicture;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName, phoneNumber, location, profilePicture },
      { new: true, runValidators: true },
    ).select("-password");

    res.success(200, "Profile updated", updatedUser);
  } catch (err) {
    next(err);
  }
};

// ----------------- CHECK AUTH -----------------
const me = async (req, res, next) => {
  try {
    res.success(200, "Authenticated", req.user);
  } catch (err) {
    next(err);
  }
};

//------------------getAll Users ---------------
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      // .select("firstName profilePicture courseType location")
      .select()
      .limit();
    // .limit(4);

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  signin,
  signup,
  profile,
  updateProfile,
  logout,
  me,
  getAllUsers,
};

/*-----------------
  authcontroller
  ------------------*/
// signUp
// signIn
// signOut        // or logout
// refreshToken
// verifyEmail
// forgotPassword
// resetPassword
// authCheck      // check if user is authenticated

/*-----------------
  usercontroller
  ------------------*/
// getProfile;
// updateProfile;
// deleteAccount;
// getUserById;
// getAllUsers;
// changePassword;
// uploadAvatar;
// followUser;
// unfollowUser;

/*-------------------
  postController
  ---------------------*/
// createPost;
// getPostById;
// getAllPosts;
// getPostsByUser;
// updatePost;
// deletePost;

/*----------------------
  commentController
  -----------------------*/
// createComment
// getCommentsByPost
// updateComment
// deleteComment

/*---------------------
  Interaction Controller
  ------------------------*/
// likePost;
// unlikePost;
// bookmarkPost;
// removeBookmark;

/*---------------------------
  Admin
  -----------------------------*/
// banUser;
// unbanUser;
// removePost;
// reviewReportedContent;

/*search Feed
  getFeed
  searchPosts
  searchUsers
  */
// getDailyPostViews;
// getWeeklyProfileViews;
// getTopViewedPosts;
// registerPostView;
// registerProfileView;

// getPostViewCount;
// getProfileViewCount;
// getPostViewCounts;
// registerPostView;
// registerProfileView;
// getPostViewCount;
// getProfileViewCount;
// viewPost;
// viewProfile;
// getPostViews;
// getProfileViews;

// post_stats {
//   post_id
//   view_count
// }
