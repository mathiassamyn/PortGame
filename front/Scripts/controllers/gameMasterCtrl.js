app.controller("gameMasterCtrl", ["$scope", "socket", "$cookies", function ($scope, socket, $cookies) {

    $scope.room = $cookies.get("guideID");
    $scope.team = $cookies.get("teamID");
    $scope.user = $cookies.get("playerID");

    socket.emit("join", $scope.room);

    $scope.game = { state: "PLAYING!!!" };

    $scope.pauseGame = function () {
        socket.emit("pause", $scope.room);
    };

    $scope.resumeGame = function () {
        socket.emit("resume", $scope.room);
    };

    socket.on("pause", function (msg) {
        $scope.$apply(function () {
            $scope.game.state = msg;
        });
    });

    socket.on("resume", function (msg) {
        $scope.$apply(function () {
            $scope.game.state = msg;
        });
    });

    //only needed if controller is outside ng-view
    //$scope.$on('$routeChangeSuccess', function () {
    //    if ($routeParams != undefined) {
    //        console.log($routeParams.guide);
    //        room = $routeParams.guide;
    //        socket.emit("join", room);
    //    }
    //});

}])