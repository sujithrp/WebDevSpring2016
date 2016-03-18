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
        console.log("profile object:");
        console.log($scope.user);

        //var callback = function(userObjResponse) {
        //    if (userObjResponse != null) {
        //        $scope.message = "User updated successfully!";
        //    }
        //};

        $scope.update = function(user) {
            console.log("profile controller userid1: "+$scope.user._id);
            console.log("object to be updated by: "+user);
            console.log(user);
            UserService.updateUser($scope.user._id,user).then(function(response) {
                $rootScope.currentUser = response.data;
                $location.path('/profile');
            })
        };


    }

})();
