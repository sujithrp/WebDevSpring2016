/**
 * Created by SujithNarayan on 2/29/2016.
 */

(function() {
    angular
        .module("SportsApp")
        .controller("SearchController", searchController);

    function searchController($scope, $http, $routeParams, CacheService) {
        var map = [];
        var id;
        var matchingText;
        map = [
            {
                "name": "San Antonio Spurs",
                "id": "583ecd4f-fb46-11e1-82cb-f4ce4684ea4c"
            }
        ];
        $scope.search = search;
        $scope.title = $routeParams.title;

        if ($scope.title) {
            search($scope.title);
        }
        else {
        }

        function search(combinedTerm) {
            id = null;
            matchingText = null;
            var combinedTermSplit = combinedTerm.split("|");
            var name = combinedTermSplit[0];
            var leagueName = combinedTermSplit[1];

            CacheService.nameToId(name, function (returnedId, matchingName) {
                if (returnedId != null) {
                    id = returnedId;
                    matchingText = matchingName;
                }
                else {
                }
            });
            // CACHE SERVICE CODE:

            var url = "/api/nba-t3/teams/" + id + "/profile.json?api_key=9hx9mmdj93q7hz26yegm47tu";
            $http.get(url)
                .then(function (response) {
                    var propertiesArr = [];
                    var playersArr = [];
                    for (property in response.data) {
                        if (property === "id") continue;
                        if (typeof response.data[property] !== 'object') {
                            var propertyObj = {
                                propertyName: property,
                                propertyValue: response.data[property]
                            };
                            if (propertiesArr.length == 0) {
                                propertiesArr = [propertyObj];
                            }
                            else {
                                propertiesArr.push(propertyObj);
                            }
                        }
                        if (property === "players") {
                            for (playerObj in response.data[property]) {
                                console.log(playerObj);
                                console.log(response.data[property][playerObj]);
                                var player = response.data[property][playerObj];
                                var playerDetailsObj = {
                                    playerId: player.id,
                                    playerFullName: player.full_name,
                                    playerPosition: player.position
                                };
                                if (playersArr.length === 0) {
                                    playersArr = [playerDetailsObj];
                                }
                                else {
                                    playersArr.push(playerDetailsObj);
                                }
                            }
                        }
                    }
                    $scope.propertiesArr = propertiesArr;
                    $scope.playersArr = playersArr;
                });
            // BING API REQUEST CODE
            var apiKey = "GnQeYWlWrkG63BdGu9qBo82NbAriUUDDAj4/6a/NeAs=";
            apiKeyEnc = btoa("ignored:"+apiKey);
            name = encodeURIComponent(matchingText);

            var bingUrl = "/bing/Image?Query='"+name.toString()+"'&$format=json";
            $http({
                method: 'GET',
                url: bingUrl,
                Authorization: "Basic: "+apiKeyEnc
            }).then(function successCallback(response) {
                $scope.mainImage = response.data.d.results[0].MediaUrl;
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

