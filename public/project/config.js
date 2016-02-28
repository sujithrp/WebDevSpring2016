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
                templateUrl: "views/users/login.view.html"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();
