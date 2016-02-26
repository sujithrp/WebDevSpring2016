/**
 * Created by SujithNarayan on 2/25/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $scope, $location, UserService) {

        var callback = function(userObjResponse) {
            $rootScope.currentUser = userObjResponse;
            $location.url("/profile");
        };

        $scope.register = function(user) {
            UserService.createUser(user,callback);
        };

    }

})();
