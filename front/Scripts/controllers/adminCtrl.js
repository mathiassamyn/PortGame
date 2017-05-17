﻿app.controller("adminCtrl", ["$scope", "socket", "$cookies", "$stateParams", "$http", "$interval", "initData", function ($scope, socket, $cookies, $stateParams, $http, $interval, initData) {

    var room = $stateParams.guide;

    $cookies.put("guideID", room);
    socket.emit("join", room);

    //var regions = [];
    //initData.then(function (response) {
    //    regions = response.regions;
    //    for (var i = 0; i < regions.length; i++) {
    //        socket.emit("join", room + regions.name);
    //    }
    //});
    $scope.state = {
        startStop: "The Game needs to be started",
        pauseResume: "The Game needs to be started"
    }

    $scope.startGame = function () {       
        $http.post("/guideStarted", {started: 1}).then(
            function successCallback(response) {
                socket.emit("start", room);
                $scope.state.startStop = "The Game is running";
                $scope.state.pauseResume = "The Game is running.";
                
            },
            function errorCallback(response) {
                console.log(response);
            });
    };

    $scope.stopGame = function () {
        $http.post("/guideStarted", { started: 0 }).then(
            function successCallback(response) {
                socket.emit("stop", room);
                $scope.state.startStop = "The game has been stopped";
                $scope.state.pauseResume ="The Game has been stopped"
            },
            function errorCallback(response) {
                console.log(response);
            });
    };

    $scope.pauseGame = function () {
        socket.emit("pause", room);
        $scope.state.pauseResume = "The Game has been paused. Click Resume to resume the game for the students.";
        $scope.state.startStop = "The Game is running";
    };

    $scope.resumeGame = function () {
        socket.emit("resume", room);
        $scope.state.pauseResume = "The Game is running";
        $scope.state.startStop = "The Game is running";
    };

    //cases should somehow be defined by regions pulled from database
    //whole timing should probably better be done on the server
    socket.on("region", function (msg) {
        var region = msg.region;
        switch (region) {
            case 'manufacturing1':
                $interval.cancel();
                $interval(function () {
                    socket.emit("product", { region: region, guide: room})
                }, 5000);
                break;
            case 'logistics1':
                $interval(function () {
                    socket.emit("product", { region: region, guide: room })
                }, 5000);
                break;
            default:
                console.log("none of the above");
        }
        //console.log("new highscore");
        //$interval(function () {
        //    console.log(region);
        //    socket.emit("product", { region: region, guide: room })
        //}, 5000);
    })


}])