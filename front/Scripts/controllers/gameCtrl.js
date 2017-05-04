app.controller("gameCtrl", ["$scope", "$location", "$routeParams", function ($scope, $location, $routeParams) {
    $scope.getScoreList = function () {
        $location.path("/result/" + $routeParams.region + "/" + $routeParams.game);
    }
}])