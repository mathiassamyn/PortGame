app.controller("gameCtrl", ["$scope", "$state", "$stateParams", function ($scope, $state, $stateParams) {

    $scope.$on('gameFinished', function (event, data) {
        console.log(data);
        $state.go("result", { region: $stateParams.region, game: data.game });
    });
}])