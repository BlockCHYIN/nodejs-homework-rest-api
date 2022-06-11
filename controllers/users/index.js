const register = require('./register');
const getCurrentUser = require('./getCurrentUser');
const login = require('./login');
const logout = require('./logout');
const updateSubscription = require('./updateSubscription');

module.exports = {
    register,
    getCurrentUser,
    login,
    logout,
    updateSubscription
};