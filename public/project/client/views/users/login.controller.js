/**
 * Created by SujithNarayan on 2/28/2016.
 */
(function() {
    "use strict";
    angular
        .module("SportsApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $scope, $location, UserService) {

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
            UserService.findUserByCredentials(user.username,user.password).then(function(response) {
                if (response.data != null) {
                    $rootScope.currentUser = response.data;
                    $location.url("/profile");
                }
                else {
                    $scope.message = "Username or password does not match. If new user, click on Register";
                }
            })
        };

    }

})();

