const { User } = require("../models/users.models")
const { response } = require("../helpers/response.helpers");

// Get all users
exports.get = async (req, res, next) => {
    try{
        // Interact with database
        const result = await User.getAll();

        // Decorate response
        response.message = "Success";
        response.data = result.rows;

        // Return data
        return res.status(200).json(response);
    }catch(err){
        return next(err);
    }
}

// Get one user
exports.get_id = (req, res, next) => {
    return res.json("/users/:id")
}

// Create a user
exports.post = (req, res, next) => {
    return res.json("/users/");
}

// Update a portion of a users data
exports.patch = (req, res, next) => {
    return res.json("/users/:id");
}

// Delete a user
exports.delete = (req, res, next) => {
    return res.json("/users/:id");
}


