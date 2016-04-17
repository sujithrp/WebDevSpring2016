/**
 * Created by SujithNarayan on 2/28/2016.
 */
/**
 * Created by SujithNarayan on 2/25/2016.
 */
(function() {
    "use strict";
    angular
        .module("SportsApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, UserService) {

        $scope.message = null;

        $scope.user = $rootScope.currentUser;

        $scope.update = function(user) {
            UserService.updateUser($scope.user._id,user).then(function(response) {
                if (response.data != null) {
                    $scope.message = "User updated successfully!";
                }
            })
        };

    }

})();

