app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
    .when("/", "/login")
    .otherwise('/notfound');

    $stateProvider
    .state("login", {
        url: "/login",
        templateUrl: "../views/login.html",
        controller: "loginCtrl"
    })
    .state("wait", {
        url: "/wait",
        templateUrl: "../views/waiting.html",
        controller: "waitCtrl"
    })
    .state("map", {
        url: "/map",
        templateUrl: "../views/map.html",
        controller: "mapCtrl"
    })
    .state("admin", {
        url: "/admin/:guide",
        templateUrl: "../views/admin.html",
        controller: "adminCtrl"
    })
    .state("game", {
        url: "/game/:region/:game",
        templateUrl: "../views/game.html",
        controller: "gameCtrl"
    })
    .state("bonusgames", {
        url: "/bonusgames/:region",
        templateUrl: "../views/bonusGames.html",
        controller: "bonusGamesCtrl"
    })
    .state("endresult", {
        url: "/endresult",
        templateUrl: "../views/endResult.html",
        controller: "endResultCtrl"
    })
    .state("inventory", {
        url: "/inventory",
        templateUrl: "../views/inventory.html",
        controller: "inventoryCtrl"
    })
    .state("market", {
        url: "/market",
        templateUrl: "../views/market.html",
        controller: "marketCtrl"
    })
    .state("region", {
        url: "/region/:region",
        templateUrl: "../views/region.html",
        controller: "regionCtrl"
    })
    .state("result", {
        url: "/result/:region/:game",
        templateUrl: "../views/region.html",
        controller: "regionCtrl"
    })
    .state("social", {
        url: "/social",
        templateUrl: "../views/social.html",
        controller: "socialCtrl"
    })
    .state("wallet", {
        url: "/wallet",
        templateUrl: "../views/wallet.html",
        controller: "walletCtrl"
    })
    .state("notFound", {
        url: "/notfound",
        templateUrl: "../views/404.html",
    })
   
    //.when("/region/:region", {
    //    title: "Region",
    //    templateUrl: "../views/region.html",
    //    controller: "regionCtrl"
    //})
    //.when("/result/:region/:game", {
    //    title: "Result",
    //    templateUrl: "../views/result.html",
    //    controller: "resultCtrl"
    //})
    //.when("/social", {
    //    title: "Social",
    //    templateUrl: "../views/social.html",
    //    controller: "socialCtrl"
    //})
    //.when("/wallet", {
    //    title: "Wallet",
    //    templateUrl: "../views/wallet.html",
    //    controller: "walletCtrl"
    //})
    //.when("/notFound", {
    //    title: "Not Found",
    //    templateUrl: "../views/404.html"
    //})
    //.when("/", {
    //    redirectTo: "/login"
    //})
    //.otherwise({
    //    redirectTo: "/notFound"
    //});
});