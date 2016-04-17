/**
 * Created by SujithNarayan on 3/22/2016.
 */
var mock = require("./user.mock.json");
var q = require("q");
module.exports = function(db, mongoose) {

    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('ProjectUser',UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findAllUsers: findAllUsers,
        updateUser: updateUser,
        createUser: createUser,
        addTeamForUser: addTeamForUser,
        deleteTeamForUser: deleteTeamForUser
    };
    return api;

    function findAllUsers() {
        return mock;
    }

    function findUserByCredentials(credentials) {

        var deferred = q.defer();

        UserModel.findOne(

            { username: credentials.username, password: credentials.password },

            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();

        UserModel.findOne(

            { username: username },

            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    }

    function updateUser(userId, user) {

        var deferred = q.defer();

        UserModel.findById(
            {"_id": userId},
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    doc.username = user.username;
                    doc.password = user.password;
                    doc.firstName = user.firstName;
                    doc.lastName = user.lastName;
                    doc.email = user.email;
                    doc.teams = user.teams;
                    doc.subscribesTo = user.subscribesTo;
                    doc.save(function(err, savedDoc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(savedDoc);
                        }
                    });
                }
            });

        return deferred.promise;
    }

    function createUser(user) {

        var deferred = q.defer();

        UserModel.create(user,
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }

    function addTeamForUser(userId, team) {

        var deferred = q.defer();

        UserModel.findById(
            {"_id": userId},
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    doc.teams.push(team);
                    doc.save(function(err, savedDoc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(savedDoc);
                        }
                    });
                }
            });

        return deferred.promise;
    }

    function deleteTeamForUser(userId, indexToBeDeleted) {
        var deferred = q.defer();

        UserModel.findById(
            {"_id": userId},
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    doc.teams.splice(indexToBeDeleted,1);
                    doc.save(function(err, savedDoc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(savedDoc);
                        }
                    });
                }
            });

        return deferred.promise;
    }

};