const ExpressError = require("../middleware/expressError.middleware");
const { User } = require("../models/users.models")

// Get all users
exports.get = async (req, res, next) => {
    try{
        // JSON SCHEME VALIDATION

        // DATABASE VALIDATION
        const result = await User.getAll();

        // SUCCESS
        return res.status(200).json(result.rows);
    }catch(err){
        return next(err);
    }
}

// Get one user
exports.get_id = async (req, res, next) => {
    try{
        // JSON SCHEME VALIDATION

        // DATABASE VALIDATION
        const result = await User.getOne(req.params.id);
    
        // Throw error if no user
        if(!result.rows[0]) throw new ExpressError(`No user found with id of "${id}"`, 404);
        
        // SUCCESS
        return res.status(200).json(result.rows[0]);
    }catch (err) {
        return next(err);
    }
}

// Create a user
exports.post = async (req, res, next) => {
    try{
        // JSON SCHEME VALIDATION

        // DATABASE VALIDATION
        const result = await User.create(req.body);
        return res.status(201).json(result.rows[0]);
    }catch(err){
        if(err.code == "23505") next(new ExpressError(`User "${req.body.username}" already exists.`, 409));

        next(new ExpressError("Internal server error"));
    }
}

// Update a portion of a users data
exports.patch = async (req, res, next) => {
    try{
        // JSON SCHEME VALIDATION

        // DATABASE VALIDATION
        const result = await User.updateInfo(req.params.id, req.body);
        if(!result.rows[0]) throw new ExpressError(`User with id of ${req.params.id} does not exist`, 404);

        // SUCCESS!
        return res.status(200).json(result.rows[0]);
    }catch(err){
        if(err.code == "42601") next(new ExpressError("Invalid values to update.", 400));
        next(err);
    }
}

// Delete a user
exports.delete = async (req, res, next) => {
    try{
        // JSON SCHEME VALIDATION

        // DATABASE VALIDATION
        const result = await User.delete(req.params);
        
        // Handle user not found
        if(!result.rows.length) throw new ExpressError(`User with id of ${req.params.id} does not exist`, 404);
        
        // SUCCESS
        return res.status(204).send();
    }catch(err){
        // Handle invalid param
        if(err.code == "22P02") next(new ExpressError("id must be an integer.", 400));
        console.log(err);
        next(err);
    }
}


