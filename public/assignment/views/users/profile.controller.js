/**
 * Created by SujithNarayan on 2/25/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, UserService) {

        $scope.user = $rootScope.currentUser;

        var callback = function(userObjResponse) {};

        $scope.update = function(user) {
            UserService.updateUser($scope.user._id,user,callback);
        };

    }

})();
