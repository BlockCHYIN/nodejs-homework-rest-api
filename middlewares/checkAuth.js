const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const checkAuth = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");

    try {
        if (bearer !== "Bearer") {
            throw new Unauthorized("Not authorized");
        }
        req.user = user;
        next();
    } catch (err) {
        if (err.message === "invalid signature") {
            err.status = 401;
        }
        next(err);
    }
};

module.exports = { checkAuth };