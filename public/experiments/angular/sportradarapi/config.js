/**
 * Created by SujithNarayan on 2/23/2016.
 */
(function() {
    angular
        .module("SportsApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "home/home.view.html"
            })
            .when("/search", {
                templateUrl: "search/search.view.html",
                controller: "SearchController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();
