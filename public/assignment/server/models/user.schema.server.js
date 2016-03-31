/**
 * Created by SujithNarayan on 3/30/2016.
 */
module.exports = function(mongoose) {

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        roles: [String]
    }, {collection: 'user'});
    return UserSchema;
};