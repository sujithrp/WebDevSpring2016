/**
 * Created by SujithNarayan on 2/25/2016.
 */
(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, UserService) {

        $scope.message = null;

        $scope.user = $rootScope.currentUser;

        var callback = function(userObjResponse) {
            if (userObjResponse != null) {
                $scope.message = "User updated successfully!";
            }
        };

        $scope.update = function(user) {
            UserService.updateUser($scope.user._id,user,callback);
        };

    }

})();
