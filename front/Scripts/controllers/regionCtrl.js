app.controller("regionCtrl", ["$scope", "$state", "$stateParams", function ($scope, $state, $stateParams) {
    $scope.bonusGameView = function () {
        $state.go("bonusgames", { region: $stateParams.region });

    }

    $scope.standardGameView = function (game) {
        $state.go("game", { region: $stateParams.region, game: game});
    }
}])