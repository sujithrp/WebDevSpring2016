/**
 * Created by SujithNarayan on 3/22/2016.
 */
var mock = require("./user.mock.json");
module.exports = function() {
    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        findUserByUsername: findUserByUsername,
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
        for(var u in mock) {
            if( mock[u].username == credentials.username &&
                mock[u].password == credentials.password) {
                return mock[u];
            }
        }
        return null;
    }

    function findUserByUsername(username) {
        for(var u in mock) {
            if( mock[u].username == username ) {
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

    function createUser(user) {
        user._id = (new Date()).getTime();
        mock.push(user);
        return user;
    }

    function addTeamForUser(userId, team) {
        var index;
        for (index in mock) {
            if (mock[index]._id === userId) {
                if (!mock[index].teams) {
                    mock[index].teams = [team];
                } else {
                    mock[index].teams.push(team);
                }
                break;
            }
        }
    }

    function deleteTeamForUser(userId, indexToBeDeleted) {
        var index;
        for (index in mock) {
            if (mock[index]._id == userId) {
                mock[index].teams.splice(indexToBeDeleted,1);
                break;
            }
        }
    }

};