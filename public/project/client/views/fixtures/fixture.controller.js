/**
 * Created by SujithNarayan on 4/4/2016.
 */


(function() {
    angular
        .module("SportsApp")
        .controller("FixtureController", FixtureController);

    function FixtureController($scope, $http) {
        var rightNow = new Date();
        //var res = rightNow.toISOString().slice(0,10).replace(/-/g,"/");
        var nbaFixtureUrl = "/sports/nba-t3/games/2016/04/05/schedule.json?api_key=9hx9mmdj93q7hz26yegm47tu";

        $http.get(nbaFixtureUrl)
            .then(function (response) {
                var gamesArr = [];
                var games = response.games;
                console.log(games);
                if (games.length != 0) {
                    var gameIndex;
                    for (gameIndex in games) {
                        var currentGame = games[gameIndex];
                        var gameObj = {};
                        gameObj.date = res;
                        gameObj.home = currentGame.home.name;
                        gameObj.away = currentGame.away.name;
                        gameObj.venue = currentGame.venue.name;
                        gamesArr.push(gameObj);
                    }
                    $scope.nbaGamesArr = gamesArr;
                }
            });
    }
})();