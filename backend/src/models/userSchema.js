const mongoose = require("mongoose");

const { Schema } = mongoose;

/* Defined Mongoose schema for a user entity. The schema specifies the
structure of the user document in the MongoDB database. */
const userSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      sparse: true,
      index: true,
    },

    phone: {
      countryCode: { type: String },
      number: { type: String },
      verified: { type: Boolean, default: false },
    },

    userName: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
      index: true,
    },

    /*-------------------------------Auth Security-------------------------*/
    passwordHash: {
      type: String,
      select: false,
    },

    authProviders: [
      {
        provider: {
          type: String,
          enum: ["local", "google", "github", "apple"],
        },
        providerId: String,
      },
    ],

    mfa: {
      enabled: { type: Boolean, default: false },
      secret: { type: String, select: false },
      backupCodes: [{ types: String, select: false }],
    },

    /*-----------------------------User Profile---------------------------------*/
    profile: {
      firstName: String,
      lastName: String,
      avatarUrl: String,
      dob: Date,
      gender: {
        type: String,
        enum: ["male", "female", "other"],
      },
      locale: {
        type: String,
        default: "en-Us",
      },
      timeZone: String,
    },

    /*-----------------------------Authorization------------------------------*/
    role: {
      type: String,
      enum: ["user", "admin", "moderator", "instructor", "system"],
      default: "user",
      index: true,
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    lastLoginAt: Date,
    lastLoginIp: String,

    /* ================= SECURITY / ABUSE ================= */
    loginAttempts: {
      count: { type: Number, default: 0 },
      lastAttemptAt: Date,
    },
    /* ================= SOFT DELETE ================= */
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },

    deletedAt: Date,

    /* ================= AUDIT ================= */
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.index({ email: 1 }, { unique: true, sparse: true });
userSchema.index({ username: 1 }, { unique: true, sparse: true });
userSchema.index({ role: 1, status: 1 });
userSchema.index({ "phone.number": 1 }, { sparse: true });
userSchema.index({ createdAt: -1 });
