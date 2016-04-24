/**
 * Created by SujithNarayan on 2/28/2016.
 */
(function() {
    "use strict";
    angular
        .module("SportsApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, UserService) {

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
            UserService
                .login(user)
                .then(function(response){
                        if(response.data) {
                            UserService.setCurrentUser(response.data);
                            $location.url("/home");
                        }
                    },
                    function (err) {
                        $scope.message = "Invalid Login Credentials. Please register if you are a new user";
                    });
        };

    }

})();

