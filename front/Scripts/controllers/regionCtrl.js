app.controller("regionCtrl", ["$scope", "$state", "$stateParams", "initData", function ($scope, $state, $stateParams, initData) {
    $scope.bonusGameView = function () {
        $state.go("bonusgames", { region: $stateParams.region });
    }
    
    var minigames = [];

    initData.then(function (response) {
        minigames = response.minigames;
    });

    $scope.standardGameView = function () {
        for (var i = 0; i < minigames.length; i++) {
            if (minigames[i].region === $stateParams.region && minigames[i].basegame === true) {
                $state.go("game." + angular.lowercase(minigames[i].game.replace(/[\s]/g, '')), { region: $stateParams.region });
            }
        }
    }
}])