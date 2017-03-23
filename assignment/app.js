module.exports = function (app) {
  // require("./services/user.service.server")(app);
  // require("./services/website.service.server")(app);
  // require("./services/page.service.server")(app);
  // require("./services/widget.service.server")(app);

  var models = require('./model/model.server')();
  require("./services/user.service.server.js")(app, models.userModel);
  require("./services/website.service.server.js")(app, models.websiteModel);
  require("./services/page.service.server.js")(app, models.pageModel);
  require("./services/widget.service.server.js")(app, models.widgetModel);
};