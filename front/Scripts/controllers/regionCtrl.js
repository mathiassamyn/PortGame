app.controller("regionCtrl", ["$scope", "$location", "$routeParams", function ($scope, $location, $routeParams) {
    $scope.bonusGameView = function () {
        $location.path("/bonusgames/" + $routeParams.region);

    }

    $scope.standardGameView = function (game) {
        $location.path("/game/" + $routeParams.region + "/" + game);
    }
}])