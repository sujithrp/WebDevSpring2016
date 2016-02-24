/**
 * Created by SujithNarayan on 2/23/2016.
 */

(function() {
    angular
        .module("SportsApp")
        .controller("SearchController", searchController);

    function searchController($scope, $http) {

        var appId = ":ZT6UwwHmcPqetCdc6nO9+16rjz5iNa/9izs7sxGO1io";
        $scope.searchTeam = search;
        var encoded = window.btoa(appId);
        //$scope.team="AC Milan";

        function search(team) {
            var url = "http://localhost:1337/api.sportradar.us/nba-t3/teams/583ecd4f-fb46-11e1-82cb-f4ce4684ea4c/profile.json?api_key=9hx9mmdj93q7hz26yegm47tu";
            //var url = "https://api.datamarket.azure.com/Bing/Search/News?Query=%27ac%20milan%27&$format=json";
            $http({
                method: 'GET',
                url: url
                //headers: {
                  //  'Authorization': 'Basic ' + encoded
                //}
            })
                .then(function(data) {
                    console.log(data)
                })
        }


    }

})();
