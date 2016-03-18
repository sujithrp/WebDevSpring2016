/**
 * Created by SujithNarayan on 3/2/2016.
 */

(function() {
    angular
        .module("SportsApp")
        .controller("TeamController", TeamController);

    function TeamController($scope, $location, $http, $routeParams, CacheService) {

        var id;
        var matchingText;
        var leagueName;

        var nameToIdCallback = function(returnedId, matchedTeam) {
            if (returnedId != null) {
                id = returnedId;
                matchingText = matchedTeam;
            }
            else {
                alert("ID not returned");
            }
        };

        if ($routeParams.teamAndLeague) {
            var teamAndLeague = $routeParams.teamAndLeague;
            var teamAndLeagueSplit = teamAndLeague.split("|");
            var team = teamAndLeagueSplit[0];
            leagueName = teamAndLeagueSplit[1];
            CacheService.nameToId(team,nameToIdCallback);
            teamDetailsFetch();
        }
        else {
            $location.url("/home");
        }

        function teamDetailsFetch() {

            // league name is also available here, so that can be used in the future
            var url = "/sports/nba-t3/teams/"+id+"/profile.json?api_key=9hx9mmdj93q7hz26yegm47tu";
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
                    $scope.playersArr = playersArr.slice(0,1);
                });
            // BING API REQUEST CODE
            matchingText = matchingText + " " + "logo";
            name = encodeURIComponent(matchingText);

            var bingUrl = "/bing/Image?Query='" + name.toString() + "'&$format=json";
            var config = {headers:  {
                'Authorization': 'Basic OlpUNlV3d0htY1BxZXRDZGM2bk85KzE2cmp6NWlOYS85aXpzN3N4R08xaW8='
            }
            };
            $http.get(bingUrl,config).then(function successCallback(response) {
                $scope.teamImage = response.data.d.results[0].MediaUrl;
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                console.log(response);
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }


        $scope.playerSearch = function (playerIndex) {
            var player = $scope.playersArr[playerIndex];
            var playerName = player.playerFullName;
            playerName = playerName.replace(" ","");
            var playerAndLeague = playerName+"|"+leagueName;
            $location.url("/player/"+playerAndLeague);
        }
    }
})();