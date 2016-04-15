/**
 * Created by SujithNarayan on 4/14/2016.
 */
module.exports = function(mongoose) {
    var blogSchema = require('./blog.schema.server.js');

    var BlogSchema = mongoose.Schema({
        username: String,
        title: String,
        content: String,
        created: {type:Date, default:new Date()},
        updated: {type:Date, default:new Date()}
    }, {collection: 'blog'});
    return BlogSchema;
};