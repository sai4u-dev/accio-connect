const mongoose = require("mongoose");

const postScheme = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    isLikeDisable: {
      type: Boolean,
    },
    isCommentDisable: {
      type: Boolean,
    },
    likes: [
      {
        userName: { type: String, required: true },
        profilePic: { type: String, required: true },
        userId: { type: String, required: true },
      },
    ],

    comments: [
      {
        userName: { type: String, required: true },
        profilePic: { type: String, required: true },
        userId: { type: String, required: true },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now() },
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postScheme);

module.exports = Post;

// const mongoose = require("mongoose");

// /* 🔹 Like SubSchema */
// const likeSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// /* 🔹 Comment SubSchema */
// const commentSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     comment: {
//       type: String,
//       required: true,
//       trim: true,
//       maxlength: 500,
//     },
//   },
//   { timestamps: true }
// );

// /* 🔹 Post Schema */
// const postSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       index: true,
//     },

//     contentType: {
//       type: String,
//       enum: ["image", "video", "text"],
//       required: true,
//     },

//     content: {
//       type: String,
//       required: true,
//     },

//     caption: {
//       type: String,
//       trim: true,
//       maxlength: 1000,
//     },

//     type: {
//       type: String,
//       enum: ["public", "private", "batch"],
//       default: "public",
//     },

//     isLikeDisabled: {
//       type: Boolean,
//       default: false,
//     },

//     isCommentDisabled: {
//       type: Boolean,
//       default: false,
//     },

//     likes: [likeSchema],
//     comments: [commentSchema],

//     isDeleted: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   {
//     timestamps: true,
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true },
//   }
// );

// /* 📊 Virtuals */
// postSchema.virtual("likeCount").get(function () {
//   return this.likes.length;
// });

// postSchema.virtual("commentCount").get(function () {
//   return this.comments.length;
// });

// /* 🔍 Text search */
// postSchema.index({ caption: "text" });

// const Post = mongoose.model("Post", postSchema);
// module.exports = Post;
