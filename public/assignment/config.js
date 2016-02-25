/**
 * Created by SujithNarayan on 2/25/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("#/home", {
                templateUrl: "home/home.view.html",
                controller: "HomeController"
            })
            .when("#/admin", {
                templateUrl: "admin/admin.view.html",
                controller: "AdminController"
            })
            .when("#/forms", {
                templateUrl: "forms/forms.view.html",
                controller: "FormsController"
            })
            .when("#/fields", {
                templateUrl: "forms/fields.view.html",
                controller: "FieldsController"
            })
            .when("#/login", {
                templateUrl: "users/login.view.html",
                controller: "LoginController"
            })
            .when("#/profile", {
                templateUrl: "users/profile.view.html",
                controller: "ProfileController"
            })
            .when("#/register", {
                templateUrl: "users/register.view.html",
                controller: "RegisterController"
            })
            .otherwise({
                redirectTo: "home/home.view.html"
            });
    }
})();
