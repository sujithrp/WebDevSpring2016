/**
 * Created by SujithNarayan on 2/25/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $scope, $location, UserService) {

        $scope.login = function(user) {
            UserService.findUserByCredentials(user.username,user.password,callback);
        };

        $scope.callback = function(userResponseObj) {
            if (!userResponseObj) {
                $rootScope.currentUser = userResponseObj;
                $location.url("/profile");
            }
        }

    }

})();
