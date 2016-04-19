/**
 * Created by SujithNarayan on 4/19/2016.
 */
/**
 * Created by SujithNarayan on 3/11/2016.
 */
(function() {
    angular
        .module("SportsApp")
        .controller("HomeTeamController", homeTeamController);

    function homeTeamController($http,$scope,$rootScope,$location, CacheService) {
        var teamName = $rootScope.clickedTeam;
        CacheService.nameToId(teamName).then(function(response) {
            console.log(response.data.id);
            var id = response.data.id;
            var url = "/sports/nfl-t1/teams/"+id+"/roster.json?api_key=c9gmk2hsnccg8hcwhmfyj9uj";

            $http.get(url)
                .then(function (response) {
                    console.log("team obj");
                    console.log(response);
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
                    }
                    $scope.propertiesArr = propertiesArr;
                    // BING API REQUEST CODE
                    matchingText = teamName + " " + "logo";
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
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
                });

        });
    }

})();

