/**
 * Created by SujithNarayan on 2/28/2016.
 */
(function() {
    "use strict";
    angular
        .module("SportsApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location, UserService) {

        $scope.$location = $location;

        $scope.logout = function() {
            UserService.setCurrentUser(null);
            $location.url('/home');
        }
    }


})();