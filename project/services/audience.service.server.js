module.exports = function (app, AudienceModel) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    passport.use('user-local',new LocalStrategy(localStrategy));
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    var bcrypt = require("bcrypt-nodejs");

    app.post("/api/audience", createUser);
    app.get("/api/audience", findUser);
    app.post("/api/login/audience", passport.authenticate('user-local'), login);
    app.get("/api/audience/wts/:uid",getWantToSeeMovies);
    app.get("/api/audience/wtstv/:uid",getWantToSeeTv);
    app.post("/api/audience/wts/:uid",addToWantToSeeMovies);
    app.post("/api/audience/wtstv/:uid",addToWantToSeeTv);
    app.get("/api/audience/:uid", findUserById);
    app.put("/api/audience/:uid", updateUser);
    app.delete("/api/audience/wts/:uid", deleteToWantToSee);
    app.delete("/api/audience/wtstv/:uid", deleteToWantToSeeTv);
    app.put("/api/audience/rate/:uid", updateUserRatings);
    app.put("/api/audience/ratetv/:uid", updateUserRatingsTv);
    app.get("/api/loggedin/audience", loggedin);
    app.post("/api/logout/audience", logout);

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/google/oauth/callback',
        passport.authenticate('google', {
            successRedirect: '/project/index.html#/profile',
            failureRedirect: '/project/index.html#/login'
        }));

    passport.use(new GoogleStrategy({
        clientID     : '867012240436-0lducptf2nsavmlnq4hm9mfr3kfmrjmt.apps.googleusercontent.com',
        clientSecret : 'vYXffI3hvJ4Qqx4g0pdwQshN',
        callbackURL  : 'http://sood-samanjate-webdev.herokuapp.com/google/oauth/callback'
    }, googleStrategy));

    function googleStrategy(token, refreshToken, profile, done) {
        AudienceModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return AudienceModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function localStrategy(username, password, done) {
        AudienceModel
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
        AudienceModel
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

    function loggedin(req, res) {
        res.send(req.user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }



    function createUser(req, res) {
        var newUser = req.body;
        newUser.firstName = null;
        newUser.lastName = null;
        newUser.email = null;
        newUser.phone = null;
        newUser.bio = null;
        newUser.profilePic = null;
        newUser.password = bcrypt.hashSync(newUser.password);
        AudienceModel
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
        AudienceModel
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
        AudienceModel
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
        AudienceModel
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
        AudienceModel
            .updateUser(userId, newUser)
            .then(function (response) {
                if(response.nModified === 1){
                    AudienceModel
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

    function getWantToSeeMovies(req, res) {
        var userId = req.params.uid;
        AudienceModel
            .findWantToSeeMovies(userId)
            .then(function (response) {
                res.json(response);
            },function (err) {
                return err;
            });
    }

    function getWantToSeeTv(req, res) {
        var userId = req.params.uid;
        AudienceModel
            .findWantToSeeTv(userId)
            .then(function (response) {
                res.json(response);
            },function (err) {
                return err;
            });
    }

    function addToWantToSeeMovies(req,res) {
        var userId = req.params.uid;
        var movie = req.body;
        AudienceModel
            .addToWantToSee(userId,movie)
            .then(function (response) {
                res.json(response);
            },function (err) {
                return err;
            });
    }

    function addToWantToSeeTv(req, res) {
        var userId = req.params.uid;
        var tv = req.body;
        AudienceModel
            .addToWantToSeeTv(userId,tv)
            .then(function (response) {
                res.json(response);
            },function (err) {
                return err;
            });
    }

    function deleteToWantToSee(req, res) {
        var userId = req.params.uid;
        var movieId = req.query.mid;
        AudienceModel
            .deleteToWantToSee(userId,movieId)
            .then(function (response) {
                res.json(response);
            },function (err) {
                return err;
            });
    }

    function deleteToWantToSeeTv(req, res) {
        var userId = req.params.uid;
        var tvId = req.query.tid;
        AudienceModel
            .deleteToWantToSeeTv(userId,tvId)
            .then(function (response) {
                res.json(response);
            },function (err) {
                return err;
            });
    }

    function updateUserRatings(req, res) {
        var userId = req.params.uid;
        var movie = req.body;
        var rate = Number(req.query.rate);
        AudienceModel
            .updateUserRating(userId, movie, rate)
            .then(function (response) {
                res.json(response);
            }, function (err) {
                return err;
            })
    }

    function updateUserRatingsTv(req, res) {
        var userId = req.params.uid;
        var tv = req.body;
        var rate = Number(req.query.rate);
        AudienceModel
            .updateUserRatingTv(userId, tv, rate)
            .then(function (response) {
                res.json(response);
            }, function (err) {
                return err;
            })
    }

};