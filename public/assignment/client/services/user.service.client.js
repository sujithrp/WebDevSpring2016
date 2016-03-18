/**
 * Created by SujithNarayan on 2/25/2016.
 */
(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http) {

        UserService.findUserByUsername = function(username) {
            var query =  "/api/assignment/user"+"?username="+username;
            return $http.get(query);
        };

        UserService.findUserByCredentials = function(username, password) {
            var query = "/api/assignment/user"+"?username="+username+"?password="+password;
            return $http.get(query);
        };

        UserService.findAllUsers = function() {
            return $http.get("/api/assignment/user");
        };

        UserService.createUser = function(user) {
            var query = "/api/assignment/user";
            return $http.post(query, user);
        };

        UserService.deleteUserById = function(userId) {
            return $http.delete("/api/assignment/user"+userId);
        };

        UserService.updateUser = function(userId, user) {
            var query = "/api/assignment/user/"+userId;
            return $http.put(query, user);
        };

        return {
            findUserByUsername: UserService.findUserByUsername,
            findUserByCredentials: UserService.findUserByCredentials,
            findAllUsers: UserService.findAllUsers,
            createUser: UserService.createUser,
            deleteUserById: UserService.deleteUserById,
            updateUser: UserService.updateUser
        };
    }
})();
