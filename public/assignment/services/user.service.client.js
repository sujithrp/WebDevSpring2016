/**
 * Created by SujithNarayan on 2/25/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {
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
                ]
            },
            {
                "_id":345,
                "firstName":"Charlie",
                "lastName":"Brown",
                "username":"charlie",
                "password":"charlie",
                "roles":[
                    "faculty"
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
                ]
            },
            {
                "_id":567,
                "firstName":"Edward",
                "lastName":"Norton",
                "username":"ed",
                "password":"ed",
                "roles":[
                    "student"
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
                }
                else {
                    // User not found
                    callback(null);
                }
            }
        };

        UserService.findAllUsers = function(callback) {
            callback(usersArr);
        };

        UserService.createUser = function(user, callback) {
            user._id = (new Date).getTime();
            usersArr.push(user);
            callback(user);
        };

        UserService.deleteUserById = function(userId, callback) {
            var userIndex;

            for (userIndex in usersArr) {
                var user = usersArr[userIndex];
                if (userId === user._id) {
                    usersArr.splice(userIndex, 1);
                    callback(usersArr);
                }
            }
        };

        UserService.updateUser = function(userId, user, callback) {
            var userIndex;

            for (userIndex in usersArr) {
                var userObj = usersArr[userIndex];
                if (userId === userObj._id) {
                    userObj.firstName = user.firstName;
                    userObj.lastName = user.lastName;
                    userObj.username = user.user;
                    userObj.password = user.password;
                    userObj.roles = user.roles;
                    callback(userObj);
                }
            }
        }

    }

})();
