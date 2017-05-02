app.controller("adminCtrl", ["$scope", "socket", "$cookies", "$routeParams", "$http", function ($scope, socket, $cookies, $routeParams, $http) {

    var room = $routeParams.guide;

    $cookies.put("guideID", room);
    socket.emit("join", room);

    $scope.startGame = function () {       
        $http.post("/guideStarted", {started: 1}).then(
            function successCallback(response) {
                socket.emit("start", room);
            },
            function errorCallback(response) {
                console.log(response);
            });
    };

    $scope.stopGame = function () {
        $http.post("/guideStarted", { started: 0 }).then(
            function successCallback(response) {
                socket.emit("stop", room);
            },
            function errorCallback(response) {
                console.log(response);
            });
    };

    $scope.pauseGame = function () {
        socket.emit("pause", room);
    };

    $scope.resumeGame = function () {
        socket.emit("resume", room);
    };


}])