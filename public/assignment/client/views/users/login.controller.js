/**
 * Created by SujithNarayan on 2/25/2016.
 */
(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, UserService) {

        $scope.login = function(user) {
            $scope.message = null;
            if (!user.username) {
                $scope.message = "Please provide a username!";
                return;
            }
            if (!user.password) {
                $scope.message = "Please provide a password!";
                return;
            }
            UserService.login(user).then(
                function(res) {
                    if(res.data) {
                        UserService.setCurrentUser(res.data);
                        $location.url("/profile");
                    }
                }
            );
            //UserService.findUserByCredentials(user.username,user.password).then(function(res) {
            //    if(res.data == null) {
            //        $scope.message = "User does not exist";
            //    }
            //    else {
            //        $rootScope.currentUser = res.data;
            //        $location.path('/profile');
            //    }
            //});
        };

    }

})();
