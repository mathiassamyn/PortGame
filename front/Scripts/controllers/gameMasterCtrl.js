app.controller("gameMasterCtrl", ["$scope", "socket", "$routeParams", function ($scope, socket, $routeParams) {

    $scope.room = $routeParams.guide;
    $scope.team = $routeParams.team;
    $scope.username = $routeParams.username;

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