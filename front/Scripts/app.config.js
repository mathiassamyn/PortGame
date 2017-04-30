app.config(function ($routeProvider) {
    $routeProvider
        //.when("/login/:guide/:team/:username", {
    .when("/login", {
        title: "Log In",
        templateUrl: "../views/login.html",
        controller: "loginCtrl"
    })
    .when("/map", {
        title: "Map",
        templateUrl: "../views/map.html",
        controller: "gameMasterCtrl"
    })
    .when("/admin/:guide", {
        title: "Admin",
        templateUrl: "../views/admin.html",
        controller: "gameMasterCtrl"
    })
    .when("/notFound", {
        title: "Not Found",
        templateUrl: "../views/404.html"
    })
    .otherwise({
        redirectTo: "/notFound"
    });
});