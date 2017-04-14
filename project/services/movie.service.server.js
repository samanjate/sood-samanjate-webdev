module.exports = function (app, MovieModel) {

    app.get("/api/movie", getMovieById);
    app.put("/api/movie", updateMovieRating);

    function getMovieById(req, res) {
        var movieId = req.query.mid;
        MovieModel
            .findMovieById(movieId)
            .then(function (movie) {
                res.json(movie);
            },function (err) {
                res.sendStatus(404).send(err);
            });
    }

    function updateMovieRating(req, res) {
        var movie = req.body;
        var rate = Number(req.query.rate);
        MovieModel
            .updateMovieRating(movie, rate)
            .then(function (movie) {
                res.json(movie);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }

};