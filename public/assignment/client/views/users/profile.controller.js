/**
 * Created by SujithNarayan on 2/25/2016.
 */
(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, $location, UserService) {

        function init() {
            UserService
                .getCurrentUser()
                .then(function (res) {
                    console.log(res.data);
                    $rootScope.currentUser = res.data;
                    console.log("this is the user");
                    console.log($rootScope.currentUser);
                    $scope.message = null;

                    $scope.user = $rootScope.currentUser;
                });
        }

        init();

        $scope.update = function(user) {
            UserService.updateUser($scope.user._id,user).then(function(response) {
                $rootScope.currentUser = response.data;
                $location.path('/profile');
            })
        };
    }

})();
