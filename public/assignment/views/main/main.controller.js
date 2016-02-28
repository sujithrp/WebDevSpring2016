/**
 * Created by SujithNarayan on 2/25/2016.
 */
(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);

    function MainController($scope, $location) {

        $scope.location = $location;
    }

})();
