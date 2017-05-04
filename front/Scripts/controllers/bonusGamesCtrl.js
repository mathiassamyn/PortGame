app.controller("bonusGamesCtrl", ["$scope", "$location", "$routeParams", function ($scope, $location, $routeParams) {
    $scope.startBonusGame = function (game) {
        //TODO: check if the team has the needed amount of products
        $location.path("/game/" + $routeParams.region + "/" + game);
    }
}])