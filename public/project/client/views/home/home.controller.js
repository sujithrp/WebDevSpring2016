/**
 * Created by SujithNarayan on 3/11/2016.
 */
(function() {
    angular
        .module("SportsApp")
        .controller("HomeController", homeController);

    function homeController($scope) {
        $scope.sportImages = [
            "#/celticsnbapreview640.jpg",
            "#/brady.jpg",
            "#/milan.jpg"
        ]
    }

})();
