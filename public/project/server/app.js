/**
 * Created by SujithNarayan on 3/22/2016.
 */
module.exports = function(app) {
    var userModel = require("./models/user.model.server.js")();
    var blogModel = require("./models/blog.model.server.js")();
    require("./services/user.service.server.js")(app, userModel);
    require("./services/blog.service.server.js")(app, blogModel)
};