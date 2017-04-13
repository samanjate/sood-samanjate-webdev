module.exports = function () {
    var model = null;
    var mongoose = require("mongoose");
    var CriticSchema = require('./critic.schema.server');
    var CriticModel = mongoose.model('CriticModel', CriticSchema);

    var api = {
        "createUser": createUser,
        "findUserById": findUserById,
        "findUserbyUsername": findUserbyUsername,
        "findUserByCredentials": findUserByCredentials,
        "updateUser": updateUser,
        "setModel":setModel
    };

    return api;

    function createUser(user) {
        delete user._id;
        return CriticModel.create(user);
    }

    function findUserById(userId) {
        return CriticModel.findById(userId);
    }

    function findUserbyUsername(username) {
        return CriticModel.find({"username":username});
    }
    function findUserByCredentials(_username, _password) {
        return CriticModel.find({username:_username, password: _password});
    }

    function updateUser(userId, updatedUser) {
        return CriticModel.update({_id:userId},{$set:updatedUser});
    }

    function setModel(_model) {
        model = _model;
    }
};