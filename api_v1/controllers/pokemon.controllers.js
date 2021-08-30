const ExpressError = require("../middleware/expressError.middleware");
const Pokemon = require("../models/pokemon.models");

// Get users favorite pokemon
exports.getFavorite = async (req, res, next) => {
    // Check database for users favorite pokemon
    const {user_id: userId} = req.params;

    const result = await Pokemon.getUserFavorites(userId);

    return res.status(200).send({favorites : result})
}

// Add a favorite pokemon
exports.addFavorite = async (req, res, next) => {
    try{
        const {userId, pokemonId} = req.body;

        const result = await Pokemon.addUserFavorite(userId, pokemonId);

        return res.status(201).send();
    }catch(error){

        if(error.code == "23503") return next(new ExpressError(`No user with id of ${userId}`));
        if(error.code == "23505") return res.status(201).send();
        return next(new ExpressError("Invalid json body", 400));
    }
}

// Delete a favorite pokemon
exports.removeFavorite = async (req, res, next) => {
    const {userId, pokemonId} = req.body;

    const result = await Pokemon.removeUserFavorite(userId, pokemonId);

    return res.status(204).send();
}