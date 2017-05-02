app.config(function ($routeProvider) {
    $routeProvider
        //.when("/login/:guide/:team/:username", {
    .when("/login", {
        title: "Log In",
        templateUrl: "../views/login.html",
        controller: "loginCtrl"
    })
    .when("/wait", {
        title: "Please Wait",
        templateUrl: "../views/waiting.html",
        controller: "waitCtrl"
    })
    .when("/map", {
        title: "Map",
        templateUrl: "../views/map.html",
        controller: "mapCtrl"
    })
    .when("/admin/:guide", {
        title: "Admin",
        templateUrl: "../views/admin.html",
        controller: "adminCtrl"
    })
    .when("/notFound", {
        title: "Not Found",
        templateUrl: "../views/404.html"
    })
    .otherwise({
        redirectTo: "/notFound"
    });
});