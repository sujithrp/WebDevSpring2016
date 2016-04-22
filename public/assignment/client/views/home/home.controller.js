/**
 * Created by SujithNarayan on 2/25/2016.
 */
(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $rootScope, $location) {

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
    }

})();