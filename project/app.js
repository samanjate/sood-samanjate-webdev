module.exports = function (app) {
    var models = require('./model/model.server')();
    require("./services/audience.service.server")(app, models.AudienceModel);
    require("./services/critic.service.server")(app, models.CriticModel);
    require("./services/movie.service.server")(app, models.MovieModel);
    require("./services/tv.service.server")(app, models.TvModel);
    require("./services/review.service.server")(app, models.ReviewModel);
};