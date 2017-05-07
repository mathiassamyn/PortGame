app.controller("resultCtrl", ["$scope", "$state", "$stateParams", "$http", function ($scope, $state, $stateParams, $http) {
    $scope.playAgain = function () {
        $state.go("game." + angular.lowercase($stateParams.game.replace(/[\s]/g, '')), { region: $stateParams.region });
    }

    $scope.score = $stateParams.score;
    $scope.topFive = [];

    $http.get("/topFive/" + $stateParams.game).then(
        function successCallback(response) {  
            for (var i = 0; i < response.data.length; i++) {
                $scope.topFive[i] = {
                    player: response.data[i][0].value,
                    team: response.data[i][1].value,
                    score: response.data[i][2].value
                }
            }
        },
        function errorCallback(response) {
            console.log(response);
        });     
}])