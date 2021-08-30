const express = require("express");
const router = express.Router();
const pokemonController = require("../controllers/pokemon.controllers");
const authToken = require("../middleware/authToken.middleware");
const hasRole = require("../middleware/hasRole.middleware");

// Get users favorite pokemon
router.get("/:user_id", authToken, pokemonController.getFavorite);

// Add a favorite pokemon
router.post("/", hasRole("user"), authToken, pokemonController.addFavorite)

// remove pokemon from a users favorites
router.delete("/", hasRole("user"), authToken,pokemonController.removeFavorite)

module.exports = router;