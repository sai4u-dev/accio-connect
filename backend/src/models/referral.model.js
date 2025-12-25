const referralSchema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyName: { type: String, required: true },
    role: { type: String, required: true },
    location: { type: String },
    jobType: { type: String, enum: ["remote", "hybrid", "onsite"] },
    description: { type: String },
    referralLink: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Referral", referralSchema);
