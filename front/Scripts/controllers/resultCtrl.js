app.controller("resultCtrl", ["$scope", "$state", "$stateParams", "$http", "socket", "$cookies", function ($scope, $state, $stateParams, $http, socket, $cookies) {

    var game = $stateParams.game;
    var region = $stateParams.region;
    var guide = $cookies.get("guideID");

    $scope.playAgain = function () {
        $state.go("game." + angular.lowercase(game.replace(/[\s]/g, '')), { region: region });
    }

    $scope.score = $stateParams.score;
    $scope.topFive = [];

    $http.get("/topFive/" + region + "/" + game).then(
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

    //would be better if this was looked at on the server, but this requires changes on the server.
    $http.get("/owner/" + region).then(
        function successCallback(response) {
            if (response.data.length > 0) {
                if ($scope[region].teamid !== response.data[0][0].value) {
                //if ($cookies.get(region).teamID !== response.data[0][0].value) {
                    socket.emit("region", { room: guide, region: region, teamID: response.data[0][0].value, team: response.data[0][1].value });
                }
            }
        },
        function errorCallback(response) {
            console.log(response);
        });
    
}])