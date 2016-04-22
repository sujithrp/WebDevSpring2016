/**
 * Created by SujithNarayan on 3/15/2016.
 */
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
        deleteUser: deleteUser
    };
    return api;

    function findUserById(userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function(err, doc) {
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

    function findAllUsers() {
        var deferred = q.defer();

        UserModel.find(function(err ,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
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

    function deleteUser(userId) {
        var deferred = q.defer();

        UserModel.remove(
            {_id: userId},
            function(doc, err) {
                if (doc) {
                    deferred.resolve(doc);
                } else {
                    deferred.reject(err);
                }
            }
        );

        return deferred.promise;

    }

};