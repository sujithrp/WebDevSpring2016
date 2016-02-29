/**
 * Created by SujithNarayan on 2/28/2016.
 */
(function() {
    "use strict";
    angular
        .module("SportsApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $scope, $location, UserService) {

        var callback = function(userObjResponse) {
            UserService.setCurrentUser(userObjResponse);
            $location.url("/profile");
        };

        $scope.register = function(user) {
            $scope.message = null;
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
            UserService.createUser(user,callback);
        };

    }

})();
