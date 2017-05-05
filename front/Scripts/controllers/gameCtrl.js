app.controller("gameCtrl", ["$scope", "$state", "$stateParams", function ($scope, $state, $stateParams) {
    $scope.getScoreList = function () {
        $state.go("result", { region: $stateParams.region, game: $stateParams.game });
    }
}])