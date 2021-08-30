const jwt = require("jsonwebtoken");
const ExpressError = require("./expressError.middleware");
const {
    SECRET_KEY
} = require("../config/config");


function hasRole(role){
    return function(req, res, next){
        try {
            console.log(req);
            const { isAdmin, userId: tokenId } = jwt.decode(req.body._token);
            console.log(isAdmin, tokenId, req.body.userId);
            if((role == "user" && tokenId == req.params.id) 
            || (role == "user" && tokenId == req.body.userId) 
            || isAdmin) return next();
            throw new ExpressError("Unauthorized", 401);
        } catch (err) {
            return next(err);
            return next(new ExpressError("Unauthorized", 401));
        }
    };
}

module.exports = hasRole;