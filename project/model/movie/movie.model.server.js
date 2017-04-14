module.exports = function () {
    var model = null;
    var mongoose = require("mongoose");
    var MovieSchema = require('./movie.schema.server');
    var MovieModel = mongoose.model('movieModel', MovieSchema);

    var api = {
        "findMovieById": findMovieById,
        "updateMovieRating": updateMovieRating,
        "setModel":setModel
    };

    return api;

    function findMovieById(movieId) {
        return MovieModel
            .find({id: movieId})
            .then(function (movie) {
                return movie[0];
            }, function (err) {
                return err;
            });
    }

    function updateMovieRating(movie, rate) {
        return MovieModel
            .find({id: movie.id})
            .then(function (movies) {
                if(movies.length) {
                    movies[0].numOfRatings += rate;
                    movies[0].totalRatings += 1;
                    movies[0].save();
                    return movies[0];
                } else {
                    movie.numOfRatings = rate;
                    movie.totalRatings = 1;
                    return MovieModel.create(movie);
                }
            }, function (err) {

            });
    }

    function setModel(_model) {
        model = _model;
    }
};