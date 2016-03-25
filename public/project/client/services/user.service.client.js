/**
 * Created by SujithNarayan on 2/28/2016.
 */
(function() {
    "use strict";
    angular
        .module("SportsApp")
        .factory("UserService", UserService);

    function UserService($http) {

        UserService.findUserByCredentials = function(username, password) {
            var query = "/api/project/user"+"?username="+username+"&password="+password;
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

        return {
            findUserByCredentials: UserService.findUserByCredentials,
            updateUser: UserService.updateUser,
            createUser: UserService.createUser,
            addTeamForUser: UserService.addTeamForUser,
            deleteTeamForUser: UserService.deleteTeamForUser
        };
    }
})();
