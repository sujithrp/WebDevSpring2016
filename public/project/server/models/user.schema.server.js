/**
 * Created by SujithNarayan on 4/12/2016.
 */
module.exports = function(mongoose) {

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        teams: [String]
    }, {collection: 'ProjectUser'});
    return UserSchema;
};