app.controller("resultCtrl", ["$scope", "$state", "$stateParams", function ($scope, $state, $stateParams) {
    $scope.playAgain = function () {
        $state.go("game." + angular.lowercase($stateParams.game.replace(/[\s]/g, '')), { region: $stateParams.region });
    }
}])