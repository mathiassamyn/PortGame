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

            //url: "/game/:region/:game",
            url: "/game/:region",

            templateUrl: "../views/game.html",

            controller: "gameCtrl"

        })

        .state("game.flappybird", {

            templateUrl: "../views/canvas.html",

            controller: "flappyBirdCtrl"

        })

        .state("game.breakout", {

            templateUrl: "../views/canvas.html",

            controller: "breakoutCtrl"

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

        .state("region.manufacturing", {

            templateUrl: "../views/r-manufacturing.html"

        })

        .state("region.logistics", {

            templateUrl: "../views/r-logistics.html"

        })

        .state("result", {

            url: "/result/:region/:game/:score",

            templateUrl: "../views/result.html",

            controller: "resultCtrl"

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

});