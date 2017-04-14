module.exports = function () {
    var AudienceModel = require("./audience/audience.model.server")();
    var CriticModel = require("./critic/critic.model.server")();
    var MovieModel = require("./movie/movie.model.server")();
    var TvModel = require("./tv/tv.model.server")();
    var ReviewModel = require("./review/review.model.server")();

    var model = {
        AudienceModel: AudienceModel,
        CriticModel: CriticModel,
        MovieModel: MovieModel,
        TvModel: TvModel,
        ReviewModel: ReviewModel
    };

    AudienceModel.setModel(model);
    CriticModel.setModel(model);
    MovieModel.setModel(model);
    TvModel.setModel(model);
    ReviewModel.setModel(model);

    return model;
};