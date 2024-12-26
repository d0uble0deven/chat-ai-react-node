const express = require("express");
const app = express();

const port = process.env.PORT || 6002;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const bodyParser = require("body-parser");

require("dotenv").config();
let cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// const allowlist = ["http://localhost:6001, http://localhost:6002"];
// const corsOptionsDelegate = function (req, callback) {
//   let corsOptions;
//   if (allowlist.indexOf(req.header("Origin")) !== -1) {
//     corsOptions = { origin: true, credentials: true }; // Enable for allowlisted origins
//   } else {
//     corsOptions = { origin: false }; // Disable for other requests
//   }
//   callback(null, corsOptions);
// };

// app.use(cors(corsOptionsDelegate));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.get("/", (req, res) => {
  res.send("<h1>Hello, Express.js Server!</h1>");
});

// Include route files
const perplexityRoute = require("./routes/Perplexity");
app.use("/perplexity", perplexityRoute);

const conversationRoutes = require("./routes/Conversations");
app.use("/conversations", conversationRoutes);

const messageRoutes = require("./routes/Messages");
app.use("/messages", messageRoutes);
