const {
    BCRYPT_WORK_FACTOR,
    SECRET_KEY
} = require("../config/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jsonschema = require("jsonschema");
const createUserSchema = require("../validators/Auth Schema/createUser.schema.json");
const ExpressError = require("../middleware/expressError.middleware");
const {
    User
} = require("../models/users.models");
const SqlToJs = require("../helpers/sqlToJs.helpers");
const db = require("../database/database");

// REGISTER FOR TOKEN
exports.register = async (req, res, next) => {
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
        
        // ADMIN STATUS
        req.body.isAdmin = false;
        
        // DATABASE VALIDATION
        const result = await User.create(req.body);
        delete result.rows[0].hashed_password;
        
        // CLEAN RESULT
        SqlToJs.convert(result.rows[0], "first_name", "firstName");
        SqlToJs.convert(result.rows[0], "user_id", "userId");

        const _token = jwt.sign({
            ...result.rows[0],
            isAdmin: false
        }, SECRET_KEY);

        // SUCCESS
        return res.status(201).json({
            _token
        });
    } catch (err) {
        console.log(err);
        if (err.code == "22001") return next(new ExpressError("Username cannot be longer than 15 characters", 400));
        if (err.constraint == "users_username_key") return next(new ExpressError(`User "${req.body.username}" already exists.`, 409));
        if (err.constraint == "users_email_key") return next(new ExpressError(`Email ${req.body.email} is already in use.`, 409));

        return next(new ExpressError("Internal server error"));
    }
}

// RETRIEVE TOKEN
exports.retrieve = async (req, res, next) => {
    try {
        const {
            username,
            password
        } = req.body;
        const result = await db.query(
            `SELECT * FROM users WHERE username = $1`,
            [username]);
        const user = result.rows[0];

        if (user) {
            if (await bcrypt.compare(password, user.hashed_password) === true) {
                delete user.hashed_password;
                // CLEAN RESULT
                SqlToJs.convert(user, "first_name", "firstName");
                SqlToJs.convert(user, "user_id", "userId");
                SqlToJs.convert(user, "is_admin", "isAdmin");
        
                const _token = jwt.sign({
                    ...user
                }, SECRET_KEY);
        
                // SUCCESS
                return res.status(201).json({
                    _token
                });
            }
            throw new ExpressError("Invalid user/password", 400);
        }
        throw new ExpressError("Invalid user/password", 400);
    } catch (err) {
        console.log(err);
        return next(new ExpressError("Invalid user/password", 400));
    }
}