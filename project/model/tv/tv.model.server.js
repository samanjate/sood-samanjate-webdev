module.exports = function () {
    var model = null;
    var mongoose = require("mongoose");
    var TvSchema = require('./tv.schema.server');
    var TvModel = mongoose.model('tvModel', TvSchema);

    var api = {
        "findTvById": findTvById,
        "updateTvRating": updateTvRating,
        "setModel":setModel
    };

    return api;

    function findTvById(tvId) {
        return TvModel
            .find({id: tvId})
            .then(function (tv) {
                return tv[0];
            }, function (err) {
                return err;
            });
    }

    function updateTvRating(tv, rate) {
        return TvModel
            .find({id: tv.id})
            .then(function (tvs) {
                if(tvs.length) {
                    tvs[0].numOfRatings += rate;
                    tvs[0].totalRatings += 1;
                    tvs[0].save();
                    return tvs[0];
                } else {
                    tv.numOfRatings = rate;
                    tv.totalRatings = 1;
                    return TvModel.create(tv);
                }
            }, function (err) {

            });
    }

    function setModel(_model) {
        model = _model;
    }
};