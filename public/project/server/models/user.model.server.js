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

    //function findUserByCredentials(credentials) {
    //    for(var u in mock) {
    //        if( mock[u].username == credentials.username &&
    //            mock[u].password == credentials.password) {
    //            return mock[u];
    //        }
    //    }
    //    return null;
    //}

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

    //function findUserByUsername(username) {
    //    for(var u in mock) {
    //        if( mock[u].username == username ) {
    //            return mock[u];
    //        }
    //    }
    //    return null;
    //}

    //function updateUser(userId, user) {
    //    for (var u in mock) {
    //        var userObj = mock[u];
    //        if (userId == userObj._id) {
    //            userObj.username = user.username;
    //            userObj.password = user.password;
    //            userObj.firstName = user.firstName;
    //            userObj.lastName = user.lastName;
    //            return userObj;
    //        }
    //    }
    //    return null;
    //}

    //function createUser(user) {
    //    user._id = (new Date()).getTime();
    //    mock.push(user);
    //    return user;
    //}

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
                    doc.emails = user.emails;
                    doc.phones = user.phones;
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
            function(doc, err) {
                if (doc) {
                    deferred.resolve(doc);
                } else {
                    deferred.reject(err);
                }
            });

        return deferred.promise;
    }

    //function addTeamForUser(userId, team) {
    //    var index;
    //    for (index in mock) {
    //        if (mock[index]._id === userId) {
    //            if (!mock[index].teams) {
    //                mock[index].teams = [team];
    //            } else {
    //                mock[index].teams.push(team);
    //            }
    //            break;
    //        }
    //    }
    //}

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

    //function deleteTeamForUser(userId, indexToBeDeleted) {
    //    var index;
    //    for (index in mock) {
    //        if (mock[index]._id == userId) {
    //            mock[index].teams.splice(indexToBeDeleted,1);
    //            break;
    //        }
    //    }
    //}

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