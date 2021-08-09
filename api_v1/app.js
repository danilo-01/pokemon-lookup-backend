const express = require("express");
const app = express();
const userRoutes = require("./routes/users.routes");
const endpointNotFound = require("./middleware/endpointNotFound.middleware");

// Parse json from request
app.use(express.json());

// User routes
app.use("/users", userRoutes);

// 404 Not found
app.use(endpointNotFound);

module.exports = app;