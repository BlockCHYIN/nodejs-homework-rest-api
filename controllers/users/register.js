const { User } = require('../../models');
const bcrypt = require('bcrypt');
const res = require('express/lib/response');

const register = async (req, resl, next) => {
    const { email, password } = req.body;

    try {
        const result = await User.create({
            email,
            password: await bcrypt.hash(password, 10),
        });
        res.status(201).json({
            user: {
                email: result.email,
                subscription: result.subscription,
            },
        });
    } catch (err) {
        if (err.code === 11000) {
            err.status = 409;
            err.message = "Email in use";
        }
        next(err);
    }
};

module.exports = register;