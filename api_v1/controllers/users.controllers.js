const SqlToJs = require("../helpers/sqlToJs.helpers");
const ExpressError = require("../middleware/expressError.middleware");
const {
    User
} = require("../models/users.models");
const jsonschema = require("jsonschema");
const createUserSchema = require("../validators/User Schema/createUser.schema.json");
const updateUserSchema = require("../validators/User Schema/updateUser.schema.json");
const {
    BCRYPT_WORK_FACTOR
} = require("../config/config");
const bcrypt = require("bcrypt");
const Pokemon = require("../models/pokemon.models");

// Get all users
exports.get = async (req, res, next) => {
    try {
        // NO SCHEMA VALIDATION NEEDED  
        // const result = await User.getAll();

        // // ERROR IF NO USERS
        // if (!result.rows[0]) throw new ExpressError(`No users in database."`, 404);
        
        // // CLEAN RESULT
        // for(let i = 0; i < result.rows.length; i++){
        //     SqlToJs.convert(result.rows[i], "first_name", "firstName");
        //     SqlToJs.convert(result.rows[i], "user_id", "userId");
        //     SqlToJs.convert(result.rows[i], "is_admin", "isAdmin");
        // }

        // SUCCESS
        return res.status(200).json("result.rows");
    } catch (err) {

        return next(new ExpressError("Server error"));
    }
}

// Get one user
exports.get_one = async (req, res, next) => {
    try {
        // NO SCHEMA VALIDATION NEEDED  

        // DATABASE VALIDATION 
        const {
            username
        } = req.params;
        const result = await User.getOne(username);

        // ERROR IF NO USER
        if (!result.rows[0]) throw new ExpressError(`No user found with username of "${username}"`, 404);

        // CLEAN RESULT
        SqlToJs.convert(result.rows[0], "first_name", "firstName");
        SqlToJs.convert(result.rows[0], "user_id", "userId");
        SqlToJs.convert(result.rows[0], "is_admin", "isAdmin");

        const usersPokemon = await Pokemon.getUserFavorites(result.rows[0].userId);

        // SUCCESS
        return res.status(200).json({
            ...result.rows[0],
            usersPokemon});
    } catch (err) {
        if (err.code == "22P02") next(new ExpressError("Invalid input syntax in paramater", 400));
        return next(err);
    }
}

// Create a user
exports.post = async (req, res, next) => {
    try {
        // JSON SCHEME VALIDATION
        const jsonResult = jsonschema.validate(req.body, createUserSchema);

        if (!jsonResult.valid) {
            let listOfErrors = jsonResult.errors.map(error => error.stack);
            let error = new ExpressError(listOfErrors, 400);
            return next(error);
        }

        // HASH PASSWORD
        req.body.password = await bcrypt.hash(req.body.password, BCRYPT_WORK_FACTOR);

        // DATABASE VALIDATION
        const result = await User.create(req.body);

        // CLEAN RESULT
        SqlToJs.convert(result.rows[0], "first_name", "firstName");
        SqlToJs.convert(result.rows[0], "user_id", "userId");
        SqlToJs.convert(result.rows[0], "is_admin", "isAdmin");

        // SUCCESS
        return res.status(201).json([result.rows[0]]);
    } catch (err) {
        if (err.code == "23505") return next(new ExpressError(`User "${req.body.username}" already exists.`, 409));

        return next(new ExpressError("Internal server error"));
    }
}

// Update a portion of a users data
exports.patch = async (req, res, next) => {
    try {
        // JSON SCHEME VALIDATION
        const jsonResult = jsonschema.validate(req.body, updateUserSchema);

        if (!jsonResult.valid) {
            let listOfErrors = jsonResult.errors.map(error => error.stack);
            let error = new ExpressError(listOfErrors, 400);
            return next(error);
        }

        // DATABASE VALIDATION
        const result = await User.updateInfo(req.params.id, req.body);
        if (!result.rows[0]) throw new ExpressError(`User with id of ${req.params.id} does not exist`, 404);

        // CLEAN RESULT
        SqlToJs.convert(result.rows[0], "first_name", "firstName");
        SqlToJs.convert(result.rows[0], "user_id", "userId");
        SqlToJs.convert(result.rows[0], "is_admin", "isAdmin");

        // SUCCESS!
        return res.status(200).json([result.rows[0]]);
    } catch (err) {
  
        if (err.code == "42601") next(new ExpressError("Invalid values to update.", 400));
        next(err);
    }
}

// Delete a user
exports.delete = async (req, res, next) => {
    try {
        // JSON SCHEMA VALIDATION

        // DATABASE VALIDATION
        const result = await User.delete(req.params.id);

        // ERROR IF NO USER
        if (!result.rows.length) throw new ExpressError(`User with id of ${req.params.id} does not exist`, 404);

        // SUCCESS
        return res.status(204).send();
    } catch (err) {
        // INVALID PARAM
        if (err.code == "22P02") next(new ExpressError("id must be an integer.", 400));

        next(err);
    }
}