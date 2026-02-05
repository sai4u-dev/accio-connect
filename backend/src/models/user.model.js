const mongoose = require("mongoose");
const { LOCATION, COURSE_TYPE, ALL_BATCH } = require("../constants");

const sessionSchema = new mongoose.Schema({
  login: { type: Date, default: Date.now },
  logout: { type: Date },
  device: { type: String },
});

// Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    lastName: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    batch: {
      type: String,
      enum: Object.values(ALL_BATCH),
      required: true,
    },

    isInstructor: {
      type: Boolean,
      default: false,
    },

    location: {
      type: String,
      enum: LOCATION,
      required: true,
    },

    courseType: {
      type: String,
      enum: COURSE_TYPE,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
    lastLogout: {
      type: Date,
    },
    sessions: [sessionSchema],
  },
  { timestamps: true },
);

// Model
const User = mongoose.model("User", userSchema);

module.exports = User;

// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema(
//   {
//     platform: {
//       type: String,
//       enum: ["instagram", "linkedin"],
//       required: true,
//     },

//     username: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//     },

//     password: {
//       type: String,
//       required: true,
//     },

//     profile: {
//       fullName: String,
//       headline: String, // LinkedIn: job title | Instagram: bio headline
//       bio: String,
//       profilePicture: String,
//       location: String,
//       website: String,
//     },

//     professionalInfo: {
//       // Mainly LinkedIn
//       currentCompany: String,
//       jobTitle: String,
//       skills: [String],
//       experience: [
//         {
//           company: String,
//           role: String,
//           startDate: Date,
//           endDate: Date,
//         },
//       ],
//     },

//     followers: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],

//     following: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],

//     connections: [
//       {
//         // Mainly LinkedIn
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],

//     isVerified: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("User", UserSchema);
/*
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      enum: ["instagram", "linkedin"],
      required: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    postType: {
      type: String,
      enum: [
        "image",
        "video",
        "reel",
        "story",
        "text",
        "document",
        "article",
        "job",
      ],
      required: true,
    },

    content: {
      text: String,          // captions or LinkedIn text
      media: [String],       // image/video URLs
      document: String,      // PDF (LinkedIn)
    },

    hashtags: [String],

    visibility: {
      type: String,
      enum: ["public", "connections", "private"],
      default: "public",
    },

    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        reaction: {
          type: String,
          enum: ["like", "love", "celebrate", "support", "insightful"],
          default: "like",
        },
      },
    ],

    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    shares: {
      type: Number,
      default: 0,
    },

    expiresAt: {
      // Instagram Stories
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
*/

// // user A follows user B
// await User.findByIdAndUpdate(userAId, {
//   $addToSet: { following: userBId },
// });

// await User.findByIdAndUpdate(userBId, {
//   $addToSet: { followers: userAId },
// });

// 6️⃣ How to CONNECT (LinkedIn)
// // mutual connection
// await User.findByIdAndUpdate(userAId, {
//   $addToSet: { connections: userBId },
// });

// await User.findByIdAndUpdate(userBId, {
//   $addToSet: { connections: userAId },
// });

// 📷 Photos

// 🎥 Videos

// 🔁 Reels (short videos)

// ⏳ Stories (24-hour content)

// 📺 Live videos

// 🖼️ Carousels (multiple images)
