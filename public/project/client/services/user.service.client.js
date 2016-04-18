/**
 * Created by SujithNarayan on 2/28/2016.
 */
(function() {
    "use strict";
    angular
        .module("SportsApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {

        UserService.getAllUsers = function() {
            var query = "/api/project/user";
            return $http.get(query);
        };

        UserService.findUserByCredentials = function(username, password) {
            var query = "/api/project/user"+"?username="+username+"&password="+password;
            return $http.get(query);
        };

        UserService.findUserByUsername = function(username) {
            console.log("client side service");
            var query = "/api/project/user"+"?username="+username;
            return $http.get(query);
        };

        UserService.updateUser = function(userId, user) {
            var query = "/api/project/user/"+userId;
            return $http.put(query, user);
        };

        UserService.createUser = function(user) {
            var query = "/api/project/user";
            return $http.post(query, user);
        };

        UserService.addTeamForUser = function(userId, team) {
            var query = "/api/project/user/"+userId+"/addTeam/"+team;
            return $http.put(query);
        };

        UserService.deleteTeamForUser = function(userId, index) {
            var query = "/api/project/user/"+userId+"/deleteTeam/"+index;
            return $http.put(query);
        };

        UserService.deleteUserById = function(userId) {
            return $http.delete("/api/project/user/"+userId);
        };

        UserService.getCurrentUser = function() {
            return $http.get("/api/project/user/loggedin");
        };

        UserService.setCurrentUser = function(user) {
            console.log("client service setting current user: ");
            $rootScope.currentUser = user;
        };

        UserService.login = function(credentials) {
            return $http.post("/api/project/user/login", credentials);
        };

        return {
            login: UserService.login,
            getAllUsers: UserService.getAllUsers,
            findUserByCredentials: UserService.findUserByCredentials,
            findUserByUsername: UserService.findUserByUsername,
            updateUser: UserService.updateUser,
            createUser: UserService.createUser,
            addTeamForUser: UserService.addTeamForUser,
            deleteTeamForUser: UserService.deleteTeamForUser,
            deleteUserById: UserService.deleteUserById,
            getCurrentUser: UserService.getCurrentUser,
            setCurrentUser: UserService.setCurrentUser
        };
    }
})();
