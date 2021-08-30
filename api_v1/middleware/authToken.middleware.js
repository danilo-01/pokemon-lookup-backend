const jwt = require("jsonwebtoken");
const ExpressError = require("./expressError.middleware");
const {
    SECRET_KEY
} = require("../config/config");



function authToken(req, res, next) {
    try {
      const authHeader = req.headers && req.headers.authorization;
      if (authHeader) {
        const token = authHeader.replace(/^[Bb]earer /, "").trim();
        res.locals.user = jwt.verify(token, SECRET_KEY);
        return next();
      }
      throw new ExpressError("Unauthorized", 401);
    } catch (err) {
      return next(new ExpressError("Unauthorized", 401));
    }
  }

module.exports = authToken;