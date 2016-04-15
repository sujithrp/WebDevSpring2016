/**
 * Created by SujithNarayan on 3/22/2016.
 */
module.exports = function(app,db,mongoose) {
    var userModel = require("./models/user.model.server.js")(db,mongoose);
    var blogModel = require("./models/blog.model.server.js")(db,mongoose);
    var cacheModel = require("./models/cache.model.server.js")();
    require("./services/user.service.server.js")(app, userModel);
    require("./services/blog.service.server.js")(app, blogModel);
    require("./services/cache.service.server.js")(app, cacheModel);
};