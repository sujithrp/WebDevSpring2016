/**
 * Created by SujithNarayan on 2/28/2016.
 */
(function() {
    "use strict";
    angular
        .module("SportsApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location, UserService) {

        $scope.logout = function() {
            UserService
                .logout()
                .then(function(){
                    UserService.setCurrentUser(null);
                    $location.url("/home");
                });
        };

        $scope.search = function(searchedItem,leagueItem) {
            if (searchedItem != null && leagueItem != null) {
                var combinedTerm = searchedItem+"|"+leagueItem;
                $rootScope.combinedTerm = combinedTerm;
                $location.url("/team/"+combinedTerm);
                $scope.searchedItem = '';
            }

        }
    }
})();