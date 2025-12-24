const express = require("express");
const app = express();
const PORT = 3000;
const domain = `http://localhost:${PORT}`;

const users = [
  {
    id: 1,
    name: "Sai",
    age: 24,
    mail: "sai@gmail.com",
    phoneNumber: 9638521478,
    location: "Hyderbad",
  },
  {
    id: crypto.randomUUID(),
    name: "Suri",
    age: 30,
    mail: "suri@gmail.com",
    phoneNumber: 9638521478,
    location: "Pune",
  },
  {
    id: crypto.randomUUID(),
    name: "Srinivas",
    age: 24,
    mail: "srinivas@gmail.com",
    phoneNumber: 9638521478,
    location: "hyderabad",
  },
  {
    id: crypto.randomUUID(),
    name: "Reddy",
    age: 24,
    mail: "reddy@gmail.com",
    phoneNumber: 9638521478,
    location: "Bangulore",
  },
];

//Middleware
app.use(express.json());

// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// });

//Routes
app.get("/", (request, response) => {
  response.send("Home Page Route🏠🏠.");
});

app.get("/about", (req, res) => {
  res.send("About Route ❄️❄️");
});

app.get("/contact", (req, res) => res.send("Contact Page 📱📱"));

app.post("/data", (req, res) => {
  res.json({ received: req.body });
});

app.get("/health", (req, res) => {
  res.json({ status: "OK", server: "running" });
});

app.get("/users", (req, res) => {
  res.json(users);
});

//dynamic routing
app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  user ? res.json(user) : res.status(404).json({ error: "User not found" });
});

const html = `<p style="height: 100vh; display:flex; align-items:center; justify-content: center;
font-size: 4em;">Not Found</p>`;
//Error Handling

// Catching undefined routes
app.use((req, res) => {
  res.status(404).send(html);
});

//Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong." });
});

//server
app.listen(PORT, () => {
  console.log(`Server Running on ${domain}`);
});
