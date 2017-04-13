module.exports = function (app) {
    var models = require('./model/model.server')();
    require("./services/audience.service.server")(app, models.AudienceModel);
    require("./services/critic.service.server")(app, models.CriticModel);
};