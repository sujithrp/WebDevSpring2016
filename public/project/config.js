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
                templateUrl: "views/home/home.view.html"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/search/:title", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();
