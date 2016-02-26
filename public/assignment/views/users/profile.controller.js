/**
 * Created by SujithNarayan on 2/25/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, $location, UserService) {

        $scope.user = $rootScope.currentUser;

        $scope.update = function(user) {
            UserService.updateUser($scope.user._id,user,callback);
        };

        $scope.callback = function(userObjResponse) {

        }
    }

})();
