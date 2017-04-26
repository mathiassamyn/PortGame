app.config(function ($routeProvider) {
    $routeProvider
    .when("/map/:guide/:team/:username", {
        title: "map",
        templateUrl: "../views/map.html",
        controller: "gameMasterCtrl"
    })
    .when("/login", {
        title: "log in",
        templateUrl: "../views/login.html",
        controller: "loginCtrl"
    })
    .when("/admin/:guide", {
        title: "admin",
        templateUrl: "../views/admin.html",
        controller: "gameMasterCtrl"
    })
    .when("/notFound", {
        title: "404 - Not Found",
        templateUrl: "../views/404.html"
    })
    .otherwise({
        redirectTo: "/notFound"
    });
});