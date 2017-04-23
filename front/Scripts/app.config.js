app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
    .when("/", {
        title: "main",
        templateUrl: "../views/main.html"
    })
    .when("/register", {
        title: "register",
        templateUrl: "../views/register.html"
    })
    .when("/login", {
        title: "log in",
        templateUrl: "../views/login.html"
    })
    .when("/admin", {
        title: "admin",
        templateUrl: "../views/admin.html"
    })
    .when("/notFound", {
        title: "404 - Not Found",
        templateUrl: "../views/404.html"
    })
    .otherwise({
        redirectTo: "/notFound"
    });

    $locationProvider.html5Mode(true);
});