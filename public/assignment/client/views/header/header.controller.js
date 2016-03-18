/**
 * Created by SujithNarayan on 2/25/2016.
 */
(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location, UserService) {

        $scope.$location = $location;

        $scope.logout = function() {
            $rootScope.currentUser = null;
            $location.url('/home');
        }
    }


})();