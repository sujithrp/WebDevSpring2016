/**
 * Created by SujithNarayan on 2/28/2016.
 */
(function() {
    angular
        .module("SportsApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/other_user", {
                templateUrl: "views/blogs/other_user.view.html",
                controller: "BlogController"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/search/:title", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController"
            })
            .when("/team/:teamAndLeague", {
                templateUrl: "views/details/team.view.html",
                controller: "TeamController"
            })
            .when("/player/:playerAndLeague", {
                templateUrl: "views/details/player.view.html",
                controller: "PlayerController"
            })
            .when("/blogs", {
                templateUrl: "views/blogs/blog.view.html",
                controller: "BlogController"
            })
            .when("/team_crud", {
                templateUrl: "views/details/team_crud.view.html",
                controller: "TeamCrudController"
            })
            .when("/fixtures", {
                templateUrl: "views/fixtures/fixture.view.html",
                controller: "FixtureController"
            })
            .when("/home_team_view", {
                templateUrl: "views/home/home_team.view.html",
                controller: "HomeTeamController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();
