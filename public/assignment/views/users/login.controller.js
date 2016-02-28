/**
 * Created by SujithNarayan on 2/25/2016.
 */
(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $scope, $location, UserService) {

        var callback = function(userResponseObj) {
            if (userResponseObj != null) {
                UserService.setCurrentUser(userResponseObj);
                $location.url("/profile");
            }
            else {
                $scope.message = "Username or password does not match. If new user, click on Register";
            }

        };

        $scope.login = function(user) {
            $scope.message = null;
            if (!user.username) {
                $scope.message = "Please provide a username";
                return;
            }
            if (!user.password) {
                $scope.message = "Please provide a password";
                return;
            }
            UserService.findUserByCredentials(user.username,user.password,callback);
        };

    }

})();
