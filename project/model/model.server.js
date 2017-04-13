module.exports = function () {
    var AudienceModel = require("./audience/audience.model.server")();
    var CriticModel = require("./critic/critic.model.server")();

    var model = {
        AudienceModel: AudienceModel,
        CriticModel: CriticModel
    };

    AudienceModel.setModel(model);
    CriticModel.setModel(model);

    return model;
};