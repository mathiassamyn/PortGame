app.controller("bonusGamesCtrl", ["$scope", "$stateParams", "$state", function ($scope, $stateParams, $state) {
    $scope.startBonusGame = function (game) {
        //TODO: check if the team has the needed amount of products
        $state.go("game", { region: $stateParams.region, game: game });
    }
}])