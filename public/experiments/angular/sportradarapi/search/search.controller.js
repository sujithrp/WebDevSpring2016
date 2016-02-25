/**
 * Created by SujithNarayan on 2/23/2016.
 */

(function() {
    angular
        .module("SportsApp")
        .controller("SearchController", searchController);

    function searchController($scope, $http) {
        $scope.searchTeam = search;

        function search() {
            var url = "/api/nba-t3/teams/583ecd4f-fb46-11e1-82cb-f4ce4684ea4c/profile.json?api_key=9hx9mmdj93q7hz26yegm47tu";
            $http.get(url)
                .then(function(response) {
                console.log(response);
            });
        }
    }

})();
