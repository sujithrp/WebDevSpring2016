/**
 * Created by SujithNarayan on 3/15/2016.
 */
var mock = require("./user.mock.json");
module.exports = function() {
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
        for(var u in mock) {
            if( mock[u]._id == userId ) {
                return mock[u];
            }
        }
    }

    function createUser(user) {
        user._id = (new Date()).getTime();
        mock.push(user);
        return user;
    }

    function findAllUsers() {
        return mock;
    }

    function findUserByCredentials(credentials) {
        for(var u in mock) {
            if( mock[u].username == credentials.username &&
                mock[u].password == credentials.password) {
                return mock[u];
            }
        }
        return null;
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