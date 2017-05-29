app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    //$locationProvider.html5Mode({
    //    enabled: true,
    //    requireBase: false
    //});

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

        .state("game.flappycontainer", {

            templateUrl: "../views/canvas.html",

            controller: "flappyContainerCtrl"

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

        .state("achievements", {

            url: "/achievements",

            templateUrl: "../views/achievements.html",

            controller: "achievementCtrl"

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

        .state("region.water", {

            templateUrl: "../views/r-water.html"

        })
        .state("region.food", {

            templateUrl: "../views/r-food.html"

        })

        .state("region.manufacturing1", {

            templateUrl: "../views/r-manufacturing1.html"

        })

        .state("region.manufacturing2", {

            templateUrl: "../views/r-manufacturing2.html"

        })
        .state("region.manufacturing3", {

            templateUrl: "../views/r-manufacturing3.html"

        })
        .state("region.manufacturing4", {

            templateUrl: "../views/r-manufacturing4.html"

        })
        .state("region.grey-manufacturing1", {

            templateUrl: "../views/r-grey-manufacturing1.html"

        })
        .state("region.grey-manufacturing2", {

            templateUrl: "../views/r-grey-manufacturing2.html"

        })
        .state("region.terminal1", {

            templateUrl: "../views/r-terminal1.html"

        })
        .state("region.terminal2", {

            templateUrl: "../views/r-terminal2.html"

        })
        .state("region.terminal3", {

            templateUrl: "../views/r-terminal3.html"

        })
        .state("region.terminal4", {

            templateUrl: "../views/r-terminal4.html"

        })
        .state("region.terminal5", {

            templateUrl: "../views/r-terminal5.html"

        })
        .state("region.terminal6", {

            templateUrl: "../views/r-terminal6.html"

        })
        .state("region.cars", {

            templateUrl: "../views/r-cars.html"

        })
        .state("region.management", {

            templateUrl: "../views/r-management.html"

        })
        .state("region.environment1", {

            templateUrl: "../views/r-environment1.html"

        })
        .state("region.environment2", {

            templateUrl: "../views/r-environment2.html"

        })
        .state("region.environment3", {

            templateUrl: "../views/r-environment3.html"

        })
        .state("region.environment4", {

            templateUrl: "../views/r-environment4.html"

        })
        .state("region.environment5", {

            templateUrl: "../views/r-environment5.html"

        })


        .state("region.logistics1", {

            templateUrl: "../views/r-logistics1.html"

        })
        .state("region.logistics2", {

            templateUrl: "../views/r-logistics2.html"
        })
        .state("region.logistics3", {

            templateUrl: "../views/r-logistics3.html"
        })
        .state("region.logistics4", {

            templateUrl: "../views/r-logistics4.html"
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

