const express = require("express");
const router = new express.Router();
const user_controller = require("../controllers/users.controllers");
const authToken = require("../middleware/authToken.middleware");
const hasRole = require("../middleware/hasRole.middleware");

// Get data about all users
router.get("/", authToken, user_controller.get);

// Get data about a single user
router.get("/:username", authToken, user_controller.get_one);

// Create a user
router.post("/", hasRole("user"), authToken, user_controller.post);

// Update a user
router.patch("/:id", hasRole("user"), authToken, user_controller.patch);

// Delete a user
router.delete("/:id", hasRole("user"), authToken, user_controller.delete)

module.exports = router;