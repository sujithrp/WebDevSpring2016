/**
 * Created by SujithNarayan on 2/23/2016.
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
           // 83aafeec-4f59-4a41-9903-854b9d85cd95
            //bMebbmdjX84ZllhoLbL26AOWxKij8PR8Ed2jLh9+IgU

            var apiKey = "GnQeYWlWrkG63BdGu9qBo82NbAriUUDDAj4/6a/NeAs=";
            apiKeyEnc = btoa("ignored:"+apiKey);
            name = encodeURIComponent(name);

            var bingUrl = "/bing/Image?Query='"+name.toString()+"'&$format=json";
            //var bingUrl = "/bing/"+name;
            $http({
                method: 'GET',
                url: bingUrl,
                Authorization: "Basic: "+apiKeyEnc
                //Accept: "application/json"
            }).then(function successCallback(response) {
                console.log(response);
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                console.log(response);
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }
    }

})();
