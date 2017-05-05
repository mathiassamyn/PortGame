app.controller("loginCtrl", ["$scope", "$state", "$http", "initData", "$cookies", "socket", function ($scope, $state, $http, initData, $cookies, socket) {

    $scope.toGame = function (guide, team, username) {
        if (guide !== undefined && team !== undefined && username !== undefined) {
            $cookies.put("guideID", guide);
            $cookies.put("teamID", team);          
            $http.post("/login", { username: username }).then(
                function successCallback(response) {                     
                    $cookies.put("playerID", response.data[0][0].value);
                    socket.emit("join", guide);
                    $state.go("wait");
                },
                function errorCallback(response) {
                    console.log(response);
                });           
        }
    }

    $scope.guideList = initData.guides;
    $scope.teamList = initData.teams;
}])
