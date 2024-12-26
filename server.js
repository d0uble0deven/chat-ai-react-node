const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Serve static files from the React frontend
const frontendPath = path.join(__dirname, "chat-ai-react/frontend/build");
app.use(express.static(frontendPath));

// API routes
const perplexityRoute = require("./routes/Perplexity");
app.use("/perplexity", perplexityRoute);

const conversationRoutes = require("./routes/Conversations");
app.use("/conversations", conversationRoutes);

const messageRoutes = require("./routes/Messages");
app.use("/messages", messageRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Backend is running successfully!" });
});

// Catch-all handler for React routing
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Start the server
const port = process.env.PORT || 6002;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
