app.controller("gameCtrl", ["$scope", "$state", "$stateParams", "$http", function ($scope, $state, $stateParams, $http) {

    $scope.$on('gameFinished', function (event, data) {
        $http.post("/score", data).then(
            function successCallback(response) {
                $state.go("result", { region: $stateParams.region, game: data.game, score: data.score });
            },
            function errorCallback(response) {
                console.log(response);
            });     
    });
}])