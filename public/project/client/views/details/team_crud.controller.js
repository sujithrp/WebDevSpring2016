/**
 * Created by SujithNarayan on 2/25/2016.
 */
(function() {
    "use strict";
    angular
        .module("SportsApp")
        .controller("TeamCrudController", TeamCrudController);

    function TeamCrudController($rootScope, $location, $scope, UserService) {
        if (!$rootScope.currentUser) {
            $scope.message = "You are not a logged in user. Please login to view favorite teams";
            return;
        }
        var currentUser = $rootScope.currentUser;
        var teams = currentUser.teams.filter (function (v, i, a) { return a.indexOf (v) == i });
        $scope.currentTeamsArr = teams;


        //$scope.addTeam = function(team) {
        //    if (!team) {
        //        $scope.message = "Enter a team name!";
        //        return;
        //    }
        //    UserService.addTeamForUser(currentUser._id, team).then(function(response) {
        //        if (!$scope.currentTeamsArr) {
        //            $scope.currentTeamsArr = [team];
        //        }
        //        else {
        //            $scope.currentTeamsArr.push(team);
        //        }
        //        $scope.leagueItem = '';
        //        $scope.team = '';
        //        $scope.message = '';
        //    })
        //};

        //var deleteTeamCallback = function(newTeamsArr) {
        //    $scope.currentTeamsArr = newTeamsArr;
        //    $scope.leagueItem  = '';
        //    $scope.team = '';
        //    $scope.message = '';
        //};

        $scope.deleteTeam = function(indexToBeDeleted) {
            UserService.deleteTeamForUser(currentUser._id, indexToBeDeleted).then(function(response) {
                $scope.currentTeamsArr.splice(indexToBeDeleted,1);
                $scope.leagueItem  = '';
                $scope.team = '';
                $scope.message = '';
            })
        };

        $scope.displayTeamDetails = function(indexToBeDisplayed) {
            var team = $scope.currentTeamsArr[indexToBeDisplayed];
            var league = $scope.leagueItem;
            var query = team+"|"+league;
            $location.url("/team/"+query);
        };

    }
})();
