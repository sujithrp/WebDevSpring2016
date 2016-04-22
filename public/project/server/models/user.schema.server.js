/**
 * Created by SujithNarayan on 4/12/2016.
 */
module.exports = function(mongoose) {

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstname: String,
        lastname: String,
        email: String,
        teams: [String],
        subscribesTo: [String]
    }, {collection: 'ProjectUser'});
    return UserSchema;
};