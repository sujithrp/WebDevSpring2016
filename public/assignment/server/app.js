/**
 * Created by SujithNarayan on 3/15/2016.
 */
module.exports = function(app) {
    var userModel = require("./models/user.model.server.js")();
    var formModel = require("./models/form.model.server.js")();
    require("./services/user.service.server.js")(app, userModel);
    require("./services/form.service.server.js")(app, formModel);
    require("./services/field.service.server.js")(app, formModel);
};
