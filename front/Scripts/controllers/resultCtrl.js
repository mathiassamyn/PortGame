app.controller("resultCtrl", ["$scope", "$location", "$routeParams", function ($scope, $location, $routeParams) {
    $scope.playAgain = function () {
        $location.path("/game/" + $routeParams.region + "/" + $routeParams.game);
    }
}])