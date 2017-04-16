module.exports = function (app, CriticModel) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    passport.use('critic-local',new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    var bcrypt = require("bcrypt-nodejs");

    app.post("/api/critic", createUser);
    app.get("/api/critic", findUser);
    app.post("/api/login/critic",passport.authenticate('critic-local'), login);
    app.get("/api/critic/:uid", findUserById);
    app.put("/api/critic/:uid", updateUser);
    app.post("/api/logout/critic", logout);
    app.get("/api/loggedin/critic", loggedin);

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function loggedin(req, res) {
        res.json(req.isAuthenticated() ? req.user : null);
    }

    function localStrategy(username, password, done) {
        CriticModel
            .findUserbyUsername(username)
            .then(function(user) {
                    if (!user.length && bcrypt.compareSync(password, user[0].password)) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        CriticModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function createUser(req, res) {
        var newUser = req.body;
        newUser.firstName = null;
        newUser.lastName = null;
        newUser.email = null;
        newUser.phone = null;
        newUser.bio = null;
        newUser.profilePic = null;
        newUser.userType = 'critic';
        newUser.password = bcrypt.hashSync(newUser.password);
        CriticModel
            .createUser(newUser)
            .then(function(user){
                if(user){
                    req.login(user, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            });
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username && password) {
            findUsersByCredentials(req, res);
        } else if(username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        CriticModel
            .findUserbyUsername(username)
            .then(function (users) {
                if(users.length != 0){
                    res.json(users[0]);
                }
                else{
                    res.sendStatus(404);
                }
            },function (err) {
                res.sendStatus(404);
            });
    }

    function findUsersByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        CriticModel
            .findUserByCredentials(username, password)
            .then(function (response) {
                if(response.length != 0){
                    res.json(response[0]);
                }
                else{
                    res.sendStatus(404);
                }
            },function (err) {
                res.sendStatus(404);
            });
    }

    function findUserById(req, res) {
        var userId = req.params.uid;
        CriticModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            },function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function updateUser(req, res) {
        var newUser = req.body;
        var userId = req.params.uid;
        CriticModel
            .updateUser(userId, newUser)
            .then(function (response) {
                if(response.nModified === 1){
                    CriticModel
                        .findUserById(userId)
                        .then(function (response) {
                            res.json(response);
                        },function () {
                            res.sendStatus(404);
                        })
                }
                else{
                    res.sendStatus(404);
                }
            },function () {
                res.sendStatus(404);
            });
    }

};