const mongoose = require("mongoose");
const { LOCATION, COURSE_TYPE, ALL_BATCH } = require("../constants");

// Schema
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    profilePicture: String,

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
  },
  { timestamps: true }
);

// Model
const User = mongoose.model("User", userSchema);

module.exports = User;
