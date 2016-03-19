/**
 * Created by SujithNarayan on 2/25/2016.
 */
(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, $location, UserService) {

        $scope.message = null;

        $scope.user = $rootScope.currentUser;

        $scope.update = function(user) {
            UserService.updateUser($scope.user._id,user).then(function(response) {
                $rootScope.currentUser = response.data;
                $location.path('/profile');
            })
        };
    }

})();
