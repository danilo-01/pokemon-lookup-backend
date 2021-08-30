const express = require("express");
const app = express();
const userRoutes = require("./routes/users.routes");
const authRoutes = require("./routes/auth.routes");
const pokemonRoutes = require("./routes/pokemon.routes");
const notFound = require("./middleware/notFound.middleware");
const cors = require("cors");

app.use(cors());

// Parse json from request
app.use(express.json());

//Auth routes
app.use("/auth", authRoutes);


// User routes
app.use("/users", userRoutes);

// pokemon routes
app.use("/pokemon", pokemonRoutes);


// 404 Not found
app.use(notFound);

module.exports = app;