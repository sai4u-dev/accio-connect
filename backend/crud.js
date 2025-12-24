const express = require("express");
const app = express();

const PORT = 3000;

const students = [
  { id: 1, name: "Divyansh", phoneNumber: 7704066235 },
  { id: 2, name: "Vivek", phoneNumber: 9876543210 },
];

// Custom response middleware
app.use((req, res, next) => {
  res.success = (statusCode, message, data = null) => {
    res.status(statusCode).json({ success: true, message, data });
  };

  res.err = (statusCode, message, data = null) => {
    res.status(statusCode).json({ success: false, message, data });
  };

  next();
});

// Get all students
app.get("/students", (req, res, next) => {
  try {
    if (!students || students.length === 0) {
      return next({ statusCode: 404, message: "No students in database" });
    }

    res.success(200, "ok", students);
  } catch (err) {
    next({ statusCode: 500, message: "Error while fetching students" });
  }
});

// Get student by ID
app.get("/student/:id", (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const student = students.find((s) => s.id === id);

    if (!student) {
      return next({ statusCode: 404, message: "Student not found" });
    }

    res.success(200, "ok", student);
  } catch (err) {
    next({ statusCode: 500, message: "Error fetching student" });
  }
});

// Centralized error handler
app.use((err, req, res, next) => {
  res.err(err.statusCode || 500, err.message || "Internal Server Error");
});

app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);


// Get all users
app.get("/users", async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.success(200, "Users fetched", users);
  } catch (err) {
    next(err);
  }
});

// Get single user
app.get("/user/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) return res.err(404, "User not found");

    res.success(200, "User fetched", user);
  } catch (err) {
    next(err);
  }
});

// Update user
app.patch("/updateUser/:id", async (req, res, next) => {
  try {
    if (!(await userExists(req.params.id)))
      return res.err(404, "User not found");

    // Prevent sensitive field updates manually
    const disallowed = ["password", "email"];
    for (let key of disallowed) {
      if (req.body[key])
        return res.err(400, `${key} cannot be updated here`);
    }

    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.success(200, "User updated successfully", updated);
  } catch (err) {
    next(err);
  }
});

// Delete user
app.delete("/deleteUser/:id", async (req, res, next) => {
  try {
    if (!(await userExists(req.params.id)))
      return res.err(404, "User not found");

    const deleted = await User.findByIdAndDelete(req.params.id);

    res.success(200, "User deleted successfully", deleted);
  } catch (err) {
    next(err);
  }
});
