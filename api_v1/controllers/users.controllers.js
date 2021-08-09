const {User} = require("../models/users.models")

// Get all users
exports.get = (req, res, next) => {
    return res.json("/users/")
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


