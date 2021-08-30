const express = require("express");
const router = new express.Router();
const auth_controller = require("../controllers/auth.controllers");

//CREATE TOKEN
router.post("/register", auth_controller.register);

// RETRIEVE TOKEN
router.post("/retrieve", auth_controller.retrieve);

module.exports = router;