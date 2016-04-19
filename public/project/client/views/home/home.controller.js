/**
 * Created by SujithNarayan on 3/11/2016.
 */
(function() {
    angular
        .module("SportsApp")
        .controller("HomeController", homeController);

    function homeController($http,$scope,CacheService) {
        console.log("home controller");
        //var nbaFixtureUrl = "/sports/nba-t3/games/2016/04/05/schedule.json?api_key=9hx9mmdj93q7hz26yegm47tu";
        //var nbaFixtureUrl = "/sports/nba-t3/games/2015/PST/schedule.json?api_key=9hx9mmdj93q7hz26yegm47tu";
        //var nbaFixtureUrl = "/sports/nba-t3/teams/583ecd4f-fb46-11e1-82cb-f4ce4684ea4c/profile.json?api_key=9hx9mmdj93q7hz26yegm47tu";
        //var nbaFixtureUrl = "/sports/nba-t3/teams/583ecd4f-fb46-11e1-82cb-f4ce4684ea4c/profile.json?api_key=9hx9mmdj93q7hz26yegm47tu";
        //var nflFixtureUrl = "/sports/nfl-t1/2015/PST/schedule.json?api_key=c9gmk2hsnccg8hcwhmfyj9uj";
        var nflFixtureUrl = "/sports/nfl-t1/2015/REG/4/boxscore.json?api_key=c9gmk2hsnccg8hcwhmfyj9uj";
        //var nflFixtureUrl = "/sports/nfl-t1/teams/2015/REG/standings.json?api_key=c9gmk2hsnccg8hcwhmfyj9uj";

        //var resultObj = {
        //    "home": "home team fsdgfdsgsolnglng",
        //    "away": "away team ffefbeklfbeufbh",
        //    "homePoints": "45",
        //    "awayPoints": "55"
        //};
        //$scope.resultsArr = [resultObj];
        //console.log($scope.resultsArr);
        //$http.get(nflFixtureUrl)
        //    .then(function (response) {
        //        $scope.resultsArr = [];
        //        var gamesArr = [];
        //        console.log(response);
        //        var details = response.data;
        //        console.log(details);
        //        var weeksArr = details.weeks;
        //        var weekNumber;
        //        for (weekNumber in weeksArr) {
        //            var weekDetails = weeksArr[weekNumber];
        //            var gamesArr = weekDetails.games;
        //            var gameNumber;
        //            for (gameNumber in gamesArr) {
        //                var gameObj = gamesArr[gameNumber];
        //                CacheService.codeToName(gameObj.home).then(function(responseHome) {
        //                    CacheService.codeToName(gameObj.away).then(function(responseAway) {
        //                        console.log("home and away:");
        //                        console.log(responseHome.data);
        //                        console.log(responseAway.data);
        //                        var gameDisplayObj = {
        //                            "home": responseHome.data,
        //                            "away": responseAway.data,
        //                            "venue": gameObj.venue
        //                        };
        //                        $scope.resultsArr.push(gameDisplayObj);
        //                    })
        //                });
        //
        //            }
        //        }
        //    });

        $http.get(nflFixtureUrl)
            .then(function(response) {
                console.log(response);
                $scope.resultsArr = [];
                var gamesArr = response.data.games;
                var gameIndex;
                for (gameIndex in gamesArr) {
                    var homeTeam = gamesArr[gameIndex].home_team.market + " " + gamesArr[gameIndex].home_team.name;
                    var awayTeam = gamesArr[gameIndex].away_team.market + " " + gamesArr[gameIndex].away_team.name;
                    var gameDisplayObj = {
                        "home": homeTeam,
                        "away": awayTeam,
                        "homePoints": gamesArr[gameIndex].home_team.points,
                        "awayPoints": gamesArr[gameIndex].away_team.points
                    };
                    $scope.resultsArr.push(gameDisplayObj);
                }
            })
    }

})();
