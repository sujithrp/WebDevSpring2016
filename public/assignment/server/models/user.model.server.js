/**
 * Created by SujithNarayan on 3/15/2016.
 */
//var mock = require("./user.mock.json");
var q = require("q");
module.exports = function(db, mongoose) {

    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('User',UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        findUserById: findUserById,
        findAllUsers: findAllUsers,
        updateUser: updateUser,
        findUserByUsername: findUserByUsername
    };
    return api;

    function findUserById(userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function(err, doc) {
            console.log(doc);
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(err);
            }
        });
        return deferred.promise;
    }

    function createUser(user) {

        var deferred = q.defer();

        UserModel.create(user, function(err, doc) {
            console.log(doc);
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findAllUsers() {
        return mock;
    }

    function findUserByCredentials(credentials) {
        //for(var u in mock) {
        //    if( mock[u].username == credentials.username &&
        //        mock[u].password == credentials.password) {
        //        return mock[u];
        //    }
        //}
        //return null;

        var deferred = q.defer();

        UserModel.findOne(

            {
                username: credentials.username,
                password: credentials.password
            },

            function(err, doc) {
                if (doc) {
                    deferred.resolve(doc);
                } else {
                    deferred.reject(err);
                }
            }
        );

        return deferred.promise;
    }

    function updateUser(userId, user) {
        for (var u in mock) {
            var userObj = mock[u];
            if (userId == userObj._id) {
                userObj.username = user.username;
                userObj.password = user.password;
                userObj.firstName = user.firstName;
                userObj.lastName = user.lastName;
                return userObj;
            }
        }
        return null;
    }

    function deleteUser(userId) {
        var indexToBeDeleted;
        for (var u in mock) {
            var userObj = mock[u];
            if (userId == userObj._id) {
                indexToBeDeleted = u;
                break;
            }
        }
        if (indexToBeDeleted) {
            mock.splice(indexToBeDeleted,1);
        }
        return mock;
    }

    function findUserByUsername(username) {
        for(var u in mock) {
            if( mock[u].username == username ) {
                return mock[u];
            }
        }
        return null;
    }

};