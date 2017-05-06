app.controller("regionCtrl", ["$scope", "$state", "$stateParams", "initData", function ($scope, $state, $stateParams, initData) {
    $scope.bonusGameView = function () {
        $state.go("bonusgames", { region: $stateParams.region });
    }

    $scope.standardGameView = function () {
        for (var i = 0; i < initData.minigames.length; i++) {
            if (initData.minigames[i].region === $stateParams.region && initData.minigames[i].basegame === true) {
                $state.go("game." + angular.lowercase(initData.minigames[i].game.replace(/[\s]/g, '')), { region: $stateParams.region });
            }
        }
    }
}])