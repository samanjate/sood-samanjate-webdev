module.exports = function (app, TvModel) {

    app.get("/api/tv", getTvById);
    app.put("/api/tv", updateTvRating);

    function getTvById(req, res) {
        var tvId = req.query.tid;
        TvModel
            .findTvById(tvId)
            .then(function (tv) {
                res.json(tv);
            },function (err) {
                res.sendStatus(404).send(err);
            });
    }

    function updateTvRating(req, res) {
        var tv = req.body;
        var rate = Number(req.query.rate);
        TvModel
            .updateTvRating(tv, rate)
            .then(function (tv) {
                res.json(tv);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }

};