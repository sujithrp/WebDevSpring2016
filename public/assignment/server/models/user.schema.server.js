/**
 * Created by SujithNarayan on 3/30/2016.
 */
module.exports = function(mongoose) {

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstname: String,
        lastname: String,
        email: String
    }, {collection: 'user'});
    return UserSchema;
};