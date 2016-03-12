/**
 * Created by SujithNarayan on 2/28/2016.
 */
(function() {
    "use strict";
    angular
        .module("SportsApp")
        .factory("UserService", UserService);

    function UserService($rootScope) {

        var usersArr = [];
        usersArr = [
            {
                "_id":123,
                "firstName":"Alice",
                "lastName":"Wonderland",
                "username":"alice",
                "password":"alice",
                "roles":[
                    "student"
                ],
                "teams": [
                    "San Antonio Spurs"
                ]
            },
            {
                "_id":234,
                "firstName":"Bob",
                "lastName":"Hope",
                "username":"bob",
                "password":"bob",
                "roles":[
                    "admin"
                ],
                "teams": []
            },
            {
                "_id":345,
                "firstName":"Charlie",
                "lastName":"Brown",
                "username":"charlie",
                "password":"charlie",
                "roles":[
                    "faculty"
                ],
                "teams": [
                    "Utah Jazz"
                ]
            },
            {
                "_id":456,
                "firstName":"Dan",
                "lastName":"Craig",
                "username":"dan",
                "password":"dan",
                "roles":[
                    "faculty",
                    "admin"
                ],
                "teams": []
            },
            {
                "_id":567,
                "firstName":"Edward",
                "lastName":"Norton",
                "username":"ed",
                "password":"ed",
                "roles":[
                    "student"
                ],
                "teams": [
                    "Boston Celtics"
                ]
            }
        ];

        UserService.findUserByCredentials = function(username, password, callback) {
            var userIndex;

            for (userIndex in usersArr) {
                var user = usersArr[userIndex];
                if (username === user.username && password === user.password) {
                    //User Found
                    callback(user);
                    return;
                }
            }
            // User not found
            callback(null);
        };

        UserService.setCurrentUser = function(user) {
            $rootScope.currentUser = user;
        };

        UserService.findAllUsers = function(callback) {
            callback(usersArr);
        };

        UserService.createUser = function(user, callback) {
            var newUser = {
                _id: (new Date).getTime(),
                firstName: null,
                lastName: null,
                username: user.username,
                password: user.password,
                roles: null
            };
            usersArr.push(newUser);
            callback(newUser);
        };

        UserService.deleteUserById = function(userId, callback) {
            var userIndex;

            for (userIndex in usersArr) {
                var user = usersArr[userIndex];
                if (userId === user._id) {
                    usersArr.splice(userIndex, 1);
                    callback(usersArr);
                    return;
                }
            }
            callback(null);
        };

        UserService.updateUser = function(userId, user, callback) {
            var userIndex;

            for (userIndex in usersArr) {
                var userObj = usersArr[userIndex];
                if (userId === userObj._id) {
                    userObj.username = user.username;
                    userObj.password = user.password;
                    userObj.firstName = user.firstName;
                    userObj.lastName = user.lastName;
                    userObj.roles = user.roles;
                    callback(userObj);
                    return;
                }
            }
            callback(null);
        };

        UserService.addTeamForUser = function(userId, team, callback) {
            var index;
            for (index in usersArr) {
                if (usersArr[index]._id === userId) {
                    if (!usersArr[index].teams) {
                        usersArr[index].teams = [team];
                    } else {
                        usersArr[index].teams.push(team);
                    }
                    callback(usersArr[index].teams);
                    break;
                }
            }
        };

        UserService.deleteTeamForUser = function(userId, indexToBeDeleted, callback) {
            var index;
            for (index in usersArr) {
                if (usersArr[index]._id === userId) {
                    var teamsArr = usersArr[index].teams;
                    usersArr[index].teams.splice(indexToBeDeleted,1);
                    callback(usersArr[index].teams);
                }
            }
        };

        return {
            usersArr: usersArr,
            findUserByCredentials: UserService.findUserByCredentials,
            findAllUsers: UserService.findAllUsers,
            createUser: UserService.createUser,
            deleteUserById: UserService.deleteUserById,
            updateUser: UserService.updateUser,
            setCurrentUser: UserService.setCurrentUser,
            addTeamForUser: UserService.addTeamForUser,
            deleteTeamForUser: UserService.deleteTeamForUser
        };
    }
})();
