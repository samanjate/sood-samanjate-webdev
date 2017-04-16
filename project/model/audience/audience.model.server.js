module.exports = function () {
    var model = null;
    var mongoose = require("mongoose");
    var AudienceSchema = require('./audience.schema.server');
    var AudienceModel = mongoose.model('AudienceModel', AudienceSchema);

    var api = {
        "createUser": createUser,
        "findUserById": findUserById,
        "findUserbyUsername": findUserbyUsername,
        "findUserByCredentials": findUserByCredentials,
        "findUserByGoogleId": findUserByGoogleId,
        "updateUser": updateUser,
        "findWantToSeeMovies": findWantToSeeMovies,
        "findWantToSeeTv": findWantToSeeTv,
        "addToWantToSee": addToWantToSee,
        "deleteToWantToSee": deleteToWantToSee,
        "addToWantToSeeTv": addToWantToSeeTv,
        "deleteToWantToSeeTv": deleteToWantToSeeTv,
        "updateUserRating": updateUserRating,
        "updateUserRatingTv": updateUserRatingTv,
        "setModel":setModel
    };

    return api;

    function createUser(user) {
        delete user._id;
        return AudienceModel.create(user);
    }

    function findUserById(userId) {
        return AudienceModel.findById(userId);
    }

    function findUserByGoogleId(googleId) {
        return AudienceModel.findOne({'google.id' : googleId});
    }

    function findUserbyUsername(username) {
        return AudienceModel.find({"username":username});
    }
    function findUserByCredentials(username, password) {
        return AudienceModel.find({username: username, password: password});
    }

    function updateUser(userId, updatedUser) {
        return AudienceModel.update({_id:userId},{$set:updatedUser});
    }

    function findWantToSeeMovies(userId) {
        return AudienceModel.find({_id:userId})
            .then(function (userDetails) {
                var wantToSeeMovies = userDetails[0].wantToSee;
                return wantToSeeMovies;
            },function (err) {
                return err;
            });
    }

    function findWantToSeeTv(userId) {
        return AudienceModel.find({_id:userId})
            .then(function (userDetails) {
                var wantToSeeMovies = userDetails[0].wantToSeeTv;
                return wantToSeeMovies;
            },function (err) {
                return err;
            });
    }

    function addToWantToSee(userId, movie) {
        return AudienceModel
            .find({"_id" : userId})
            .then(function (user) {
                var movies = user[0].wantToSee;
                for(var m in movies) {
                    if(movies[m].id == movie.id) {
                        return user[0];
                    }
                }
                user[0].wantToSee.push(movie);
                user[0].save();
                return user[0];
        }, function (err) {
            return err;
        });
    }

    function addToWantToSeeTv(userId, tv) {
        return AudienceModel
            .find({"_id" : userId})
            .then(function (user) {
                if(!user[0].wantToSeeTv) user[0].wantToSeeTv = [];
                var tvs = user[0].wantToSeeTv;
                for(var t in tvs) {
                    if(tvs[t].id == tv.id) {
                        return user[0];
                    }
                }
                user[0].wantToSeeTv.push(tv);
                user[0].save();
                return user[0];
            }, function (err) {
                return err;
            });
    }

    function deleteToWantToSee(userId, movieId) {
        return AudienceModel
            .find({"_id":userId})
            .then(function (user) {
                for(var m in user[0].wantToSee) {
                    if(user[0].wantToSee[m].id == movieId) {
                        user[0].wantToSee.splice(m,1);
                    }
                }
                user[0].save();
                return user[0];
            }, function (err) {
                return err;
            });
    }

    function deleteToWantToSeeTv(userId, tvId) {
        return AudienceModel
            .find({"_id":userId})
            .then(function (user) {
                for(var t in user[0].wantToSeeTv) {
                    if(user[0].wantToSeeTv[t].id == tvId) {
                        user[0].wantToSeeTv.splice(t,1);
                    }
                }
                user[0].save();
                return user[0];
            }, function (err) {
                return err;
            });
    }

    function updateUserRating(userId, movie, rate) {
        return AudienceModel
            .find({"_id":userId})
            .then(function (user) {
                movie.rating = rate;
                user[0].ratings.push(movie);
                user[0].save();
                return user[0];
            }, function (err) {
                return err;
            });
    }

    function updateUserRatingTv(userId, tv, rate) {
        return AudienceModel
            .find({"_id":userId})
            .then(function (user) {
                tv.rating = rate;
                user[0].ratingsTv.push(tv);
                user[0].save();
                return user[0];
            }, function (err) {
                return err;
            });
    }

    function setModel(_model) {
        model = _model;
    }
};