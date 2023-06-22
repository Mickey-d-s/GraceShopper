require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const server = express();

const client = require("./db/client");
const cookieParser = require("cookie-parser");
client.connect();
// Middleware
server.use(express.json());
server.use(express.static(path.join(__dirname, "./db/client")));
server.use(morgan("dev"));
server.use(cors());
server.use(cookieParser(process.env.COOKIE_SECRET));


// Servers the built React app
server.use(express.static(path.join(__dirname, "./client", "dist")));

// Routes
server.use("/api", require("./routes"));

// Sends the built React app for all other requests

server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "./client/dist", "index.html"));
});

server.use((err, req, res, next) => {
  res.send({
    success: false,
    message: err.message,
    name: err.name,
    stack: err.stack,
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
