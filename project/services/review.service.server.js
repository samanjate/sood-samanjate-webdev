module.exports = function (app, ReviewModel) {

    app.post("/api/publish", publishReview);
    app.get("/api/check", checkIfAlreadyReviewed);
    app.get("/api/reviews", getReviews);

    function publishReview(req, res) {
        var review  = req.body;
        ReviewModel
            .publishReview(review)
            .then(function (review) {
                res.json(review);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }

    function checkIfAlreadyReviewed(req, res) {
        var id = req.query.id;
        var criticId = req.query.criticId;
        ReviewModel
            .checkIfReviewed(id, criticId)
            .then(function (review) {
                res.json(review);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }

    function getReviews(req, res) {
        var id = req.query.eId;
        var userId = req.query.uid;
        if(id != null) return getEntertainmentReviews(id,res);
        else if(userId != null) getCriticReviews(userId,res);
    }

    function getEntertainmentReviews(id,res) {
        ReviewModel
            .findAllReviews(id)
            .then(function (reviews) {
                res.json(reviews);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }

    function getCriticReviews(id,res) {
        ReviewModel
            .findCriticReviews(id)
            .then(function (reviews) {
                res.json(reviews);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }
};