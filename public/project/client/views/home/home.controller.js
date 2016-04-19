/**
 * Created by SujithNarayan on 3/11/2016.
 */
(function() {
    angular
        .module("SportsApp")
        .controller("HomeController", homeController);

    function homeController($http,$scope,$rootScope,$location, UserService, CacheService) {
        UserService
            .getCurrentUser()
            .then(function (res) {
                $rootScope.currentUser = res.data;
                $scope.message = null;

                $scope.user = $rootScope.currentUser;
            });
        var nflFixtureUrl = "/sports/nfl-t1/2015/REG/4/boxscore.json?api_key=c9gmk2hsnccg8hcwhmfyj9uj";

        //var resultObj = {
        //    "home": "home team fsdgfdsgsolnglng",
        //    "away": "away team ffefbeklfbeufbh",
        //    "homePoints": "45",
        //    "awayPoints": "55"
        //};
        //$scope.resultsArr = [resultObj];

        $http.get(nflFixtureUrl)
            .then(function(response) {
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
            });

        $scope.teamClicked = function(teamName) {
            $rootScope.clickedTeam = teamName;
            $location.url("/home_team_view");
        };

    }

})();
