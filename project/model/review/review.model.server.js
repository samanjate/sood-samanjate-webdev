module.exports = function () {
    var model = null;
    var mongoose = require("mongoose");
    var ReviewSchema = require('./review.schema.server');
    var ReviewModel = mongoose.model('reviewModel', ReviewSchema);

    var api = {
        "publishReview": publishReview,
        "checkIfReviewed": checkIfReviewed,
        "findAllReviews": findAllReviews,
        "findCriticReviews": findCriticReviews,
        "setModel":setModel
    };

    return api;

    function publishReview(review) {
        return ReviewModel
            .create(review);
    }

    function checkIfReviewed(id, criticId) {
        return ReviewModel
            .find({id: id, criticId: criticId})
            .then(function (review) {
                return review[0];
            }, function (err) {

            });
    }

    function findAllReviews(id) {
        return ReviewModel
            .find({id: id})
            .then(function (reviews) {
                return reviews;
            }, function (err) {

            });
    }

    function findCriticReviews(id) {
        return ReviewModel
            .find({criticId: id})
            .then(function (reviews) {
                return reviews;
            }, function (err) {

            });
    }

    function setModel(_model) {
        model = _model;
    }
};