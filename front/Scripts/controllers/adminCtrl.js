app.controller("adminCtrl", ["$scope", "socket", "$cookies", "$stateParams", "$http", "$interval", "initData", function ($scope, socket, $cookies, $stateParams, $http, $interval, initData) {

    var room = $stateParams.guide;

    $cookies.put("guideID", room);
    socket.emit("join", room);

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

    $scope.clearDatabase = function () {
        $http.post("/clearDatabase").then(
            function successCalback(response) {
                console.log("DB has been cleared")
            },
            function errorCallback(response) {
                console.log(response);
            });
    }

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

    //whole timing should probably better be done on the server
    socket.on("region", function (msg) {
        var region = msg.region;
        console.log($scope[region + "interval"]);
        $interval.cancel($scope[region + "interval"]);
        $scope[region + "interval"] = $interval(function () {
            console.log(region);
            socket.emit("product", { region: region, guide: room })
        }, 30000);
    })


}])