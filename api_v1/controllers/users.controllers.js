const { User } = require("../models/users.models")

// Get all users
exports.get = async (req, res, next) => {
    try{
        // Interact with database
        const result = await User.getAll();

        // Decorate response
        response = {
            users: result.rows,
        }
        // Return data
        return res.status(200).json(response);
    }catch(err){
        return next(err);
    }
}

// Get one user
exports.get_id = async(req, res, next) => {
    try{
        const {id} = req.params;

        const result = await User.getOne(id);
    
        // Throw error if no user
        if(!result.rows[0]) throw new Error("bad bruh");
    
        response = {
            users: result.rows[0],
        }
    
        return res.status(200).json(response);
    }catch (err) {
        return next(err);
    }
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


