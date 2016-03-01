/**
 * Created by SujithNarayan on 2/29/2016.
 */

(function() {
    angular
        .module("SportsApp")
        .controller("SearchController", searchController);

    function searchController($scope, $http, CacheService) {

        var id;

        var nameToIdCallback = function(returnedId) {
            if (returnedId != null) {
                alert("ID returned");
                id = returnedId;
            }
            else {
                alert("ID not returned");
            }
        };


        $scope.search = function(name) {
            id = null;
            CacheService.nameToId(name,nameToIdCallback);
            //583ecd4f-fb46-11e1-82cb-f4ce4684ea4c
            alert("Just before search: ");
            alert(id);
            var url = "/api/nba-t3/teams/"+id+"/profile.json?api_key=9hx9mmdj93q7hz26yegm47tu";
            //var url = "/api/fantasy/pro-teams?version=3.0";
            //$http.get(url)
            //    .then(function(response) {
            //    console.log(response);
            //});
        }
    }

})();

