const express = require("express");
const router = new express.Router();
const user_controller = require("../controllers/users.controllers");

// Get data about all users
router.get("/", user_controller.get);

// Get data about a single user
router.get("/:id", user_controller.get_id);

// Create a user
router.post("/", user_controller.post);

// Update a user
router.patch("/:id", user_controller.patch);

// Delete a user
router.delete("/:id", user_controller.delete)

module.exports = router;