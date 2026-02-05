const mongoose = require("mongoose");
const User = require("./models/user.model");
const Post = require("./models/Post.model");

const MONGO_URI = "mongodb://127.0.0.1:27017/social_app";

const sampleImages = [
  "https://assets.lummi.ai/assets/QmWMhnvoGLrpNuzpxqMenDurKP6ZHGKvfdnhR4Upap235o?auto=format&w=2000&mark=https%3A%2F%2Fwww.lummi.ai%2Flummi-watermark.png&mark-tile=grid&mark-w=0.18&mark-alpha=12",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    await User.deleteMany();
    await Post.deleteMany();

    /* ---------------- USERS ---------------- */
    const users = await User.insertMany(
      Array.from({ length: 10 }).map((_, i) => ({
        firstName: `User${i + 1}`,
        lastName: "Test",
        email: `user${i + 1}@test.com`,
        phoneNumber: `90000000${i + 1}`,
        password: "hashedpassword",
        batch: "OBH_1",
        location: "hyderabad",
        courseType: "mern",
        profilePicture: sampleImages[i % sampleImages.length],
      }))
    );

    console.log("10 Users created");

    /* ---------------- POSTS ---------------- */
    const posts = [];

    for (let i = 0; i < 30; i++) {
      const user = users[i % users.length];
      const isDisabled = i % 5 === 0; // Every 5th post disabled

      posts.push({
        user: user._id,
        contentType: "image",
        content: sampleImages[i % sampleImages.length],
        caption: `This is sample post #${i + 1}`,
        type: "POST",
        isLikeDisable: isDisabled,
        isCommentDisable: isDisabled,

        likes: isDisabled
          ? []
          : users.slice(0, 3).map((u) => ({
              userName: u.firstName,
              profilePic: u.profilePicture,
              userId: u._id.toString(),
            })),

        comments: isDisabled
          ? []
          : [
              {
                userName: users[1].firstName,
                profilePic: users[1].profilePicture,
                userId: users[1]._id.toString(),
                comment: "Nice post!",
              },
              {
                userName: users[2].firstName,
                profilePic: users[2].profilePicture,
                userId: users[2]._id.toString(),
                comment: "Great content 👍",
              },
            ],
      });
    }

    await Post.insertMany(posts);
    console.log("30 Posts created");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDatabase();
