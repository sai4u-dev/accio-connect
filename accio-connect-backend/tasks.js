// backend/server.js
const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory "database"
let tasks = [];

// Basic route
app.get("/", (req, res) => res.send(tasks));

// GET all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// GET a single task by ID
app.get("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
});

// POST a new task
// POST one or many tasks
app.post("/tasks", (req, res) => {
  const body = req.body;

  // If the incoming body is an array (bulk insert)
  if (Array.isArray(body)) {
    const newTasks = body.map((task) => ({
      id: crypto.randomUUID(),
      title: task.title,
      description: task.description || "",
      status: task.status || "pending",
      priority: task.priority || "medium",
      assignedTo: task.assignedTo || "Unassigned",
    }));

    tasks.push(...newTasks);
    return res.status(201).json({
      message: `${newTasks.length} tasks created successfully`,
      tasks: newTasks,
    });
  }

  // If single object (single insert)
  const { title, description, status, priority, assignedTo } = body;

  const newTask = {
    id: crypto.randomUUID(),
    title,
    description: description || "",
    status: status || "pending",
    priority: priority || "medium",
    assignedTo: assignedTo || "Unassigned",
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT (update task)
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, status, priority, assignedTo } = req.body;

  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;
  if (priority !== undefined) task.priority = priority;
  if (assignedTo !== undefined) task.assignedTo = assignedTo;

  res.json(task);
});

// DELETE a task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return res.status(404).json({ message: "Task not found" });

  const deletedTask = tasks.splice(index, 1)[0];
  res.json(deletedTask);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
