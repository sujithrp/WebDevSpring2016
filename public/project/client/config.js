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
                controller: "HomeController",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/other_user", {
                templateUrl: "views/blogs/other_user.view.html",
                controller: "BlogController",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/search/:title", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/team/:teamAndLeague", {
                templateUrl: "views/details/team.view.html",
                controller: "TeamController",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/player/:playerAndLeague", {
                templateUrl: "views/details/player.view.html",
                controller: "PlayerController",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/blogs", {
                templateUrl: "views/blogs/blog.view.html",
                controller: "BlogController",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/team_crud", {
                templateUrl: "views/details/team_crud.view.html",
                controller: "TeamCrudController",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/fixtures", {
                templateUrl: "views/fixtures/fixture.view.html",
                controller: "FixtureController"
            })
            .when("/home_team_view", {
                templateUrl: "views/home/home_team.view.html",
                controller: "HomeTeamController",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    var checkLoggedin = function($q, $http, $location, $rootScope){
        var deferred = $q.defer();

        $http.get("/api/project/user/loggedin").success(function(user){

            if(user) {
                $rootScope.currentUser = user;
                //$location.url("/home");
                deferred.resolve();
            } else {
                deferred.reject();
                $location.url("/home");
            }
        });

        return deferred.promise;
    };


    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get("/api/project/user/loggedin").success(function(user)
        {
            if (user)
            {
                $rootScope.currentUser = user;
            }
            deferred.resolve();

        });

        return deferred.promise;
    };
})();
