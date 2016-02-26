/**
 * Created by SujithNarayan on 2/25/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $scope, $location, UserService) {

        $scope.register = function(user) {
            UserService.createUser(user,callback);
        };

        $scope.callback = function(userObjResponse) {
            $rootScope.currentUser = userObjResponse;
            $location.url("/profile");
        };

    }

})();
