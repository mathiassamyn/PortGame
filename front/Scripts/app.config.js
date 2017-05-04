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
    .when("/game/:region/:game", {
        title: "Game",
        templateUrl: "../views/game.html",
        controller: "gameCtrl"
    })
    .when("/bonusgames/:region", {
        title: "Bonus Games",
        templateUrl: "../views/bonusGames.html",
        controller: "bonusGamesCtrl"
    })
    .when("/endresult", {
        title: "End Result",
        templateUrl: "../views/endResult.html",
        controller: "endResultCtrl"
    })
    .when("/inventory", {
        title: "Inventory",
        templateUrl: "../views/inventory.html",
        controller: "inventoryCtrl"
    })
    .when("/market", {
        title: "Market",
        templateUrl: "../views/market.html",
        controller: "marketCtrl"
    })
    .when("/region/:region", {
        title: "Region",
        templateUrl: "../views/region.html",
        controller: "regionCtrl"
    })
    .when("/result/:region/:game", {
        title: "Result",
        templateUrl: "../views/result.html",
        controller: "resultCtrl"
    })
    .when("/social", {
        title: "Social",
        templateUrl: "../views/social.html",
        controller: "socialCtrl"
    })
    .when("/wallet", {
        title: "Wallet",
        templateUrl: "../views/wallet.html",
        controller: "walletCtrl"
    })
    .when("/notFound", {
        title: "Not Found",
        templateUrl: "../views/404.html"
    })
    .when("/", {
        redirectTo: "/login"
    })
    .otherwise({
        redirectTo: "/notFound"
    });
});