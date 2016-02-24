/**
 * Created by SujithNarayan on 2/23/2016.
 */
(function() {
    angular
        .module("SportsApp")
        .controller("NavController", navController);

    function navController($scope, $location) {
        $scope.$location = $location;
    }
})();