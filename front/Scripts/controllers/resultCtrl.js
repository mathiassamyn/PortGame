app.controller("resultCtrl", ["$scope", "$state", "$stateParams", function ($scope, $state, $stateParams) {
    $scope.playAgain = function () {
        $state.go("game", { region: $stateParams.region, game: $stateParams.game });
    }
}])