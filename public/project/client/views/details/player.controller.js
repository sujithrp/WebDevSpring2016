/**
 * Created by SujithNarayan on 3/2/2016.
 */

(function() {
    angular
        .module("SportsApp")
        .controller("PlayerController", PlayerController);

    function PlayerController($scope, $location, $http, $routeParams, CacheService) {

        var id;
        var leagueName;
        var playerName;
        var matchingText;

        if ($routeParams.playerAndLeague ) {
            var playerAndLeague = $routeParams.playerAndLeague;
            var playerAndLeagueSplit = playerAndLeague.split("|");
            playerName = playerAndLeagueSplit[0];
            leagueName = playerAndLeagueSplit[1];
            CacheService.nameToId(playerName).then(function(response) {
                playerDetailsFetch(response.data.id, response.data.name, leagueName);
            });
        }
        else {
            $location.url("/home");
        }

        function playerDetailsFetch(id, matchingText, leagueName) {
            var url;

            if (leagueName == 'NBA') url = "/sports/nba-t3/players/"+id+"/profile.json?api_key=9hx9mmdj93q7hz26yegm47tu";
            else if (leagueName == 'MLB') url = "/sports/mlb-t5/players/"+id+"/profile.json?api_key=ckmjne8548eb9dw9arjrdxk2";
            else return;

            $http.get(url)
                .then(function (response) {
                    var propertiesArr = [];
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
                    }
                    $scope.propertiesArr = propertiesArr;
                });
            // BING API REQUEST CODE
            var name = encodeURIComponent(matchingText);

            var bingUrl = "/bing/Image?Query='" + name.toString() + "'&$format=json";

            var config = {headers:  {
                'Authorization': 'Basic OlpUNlV3d0htY1BxZXRDZGM2bk85KzE2cmp6NWlOYS85aXpzN3N4R08xaW8='
            }
            };
            $http.get(bingUrl,config).then(function successCallback(response) {
                $scope.playerImage = response.data.d.results[0].MediaUrl;
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }
    }
})();