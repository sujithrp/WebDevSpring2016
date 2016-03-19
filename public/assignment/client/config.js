/**
 * Created by SujithNarayan on 3/15/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html"
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller: "FormController"
            })
            .when("/field", {
                templateUrl: "views/forms/field.view.html",
                controller: "FieldController"
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
            .when("/form/:formId/fields",{
                templateUrl:"views/forms/field.view.html",
                controller:"FieldController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();
