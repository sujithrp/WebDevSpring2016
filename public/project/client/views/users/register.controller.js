/**
 * Created by SujithNarayan on 2/28/2016.
 */
(function() {
    "use strict";
    angular
        .module("SportsApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $scope, $location, UserService) {

        $scope.register = function(user) {
            $scope.message = null;
            if (!user) {
                $scope.message = "Please provide the required details";
                return;
            }
            if (!user.username) {
                $scope.message = "Please provide a username";
                return;
            }
            if (!user.password || !user.verifyPassword) {
                $scope.message = "Please provide a password";
                return;
            }
            if (user.password != user.verifyPassword) {
                $scope.message = "Passwords must match";
                return;
            }
            UserService.findUserByUsername(user.username).then(
                function(response) {
                    if (response.data && (response.data.username == user.username)) {
                        $scope.message = "Username already exists! Please provide a different username";
                    }
                    else {
                        console.log("controller: ");
                        console.log(user);
                        UserService.createUser(user).then(function(response) {
                            UserService.setCurrentUser(response.data);
                            $location.url("/home");
                        })
                    }
                }
            )
        };

    }

})();
