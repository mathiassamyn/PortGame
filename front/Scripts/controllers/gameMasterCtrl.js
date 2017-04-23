app.controller("gameMasterCtrl", ["$scope", "socket", function ($scope, socket) {

    var room;

    $scope.game = { state: "PLAYING!!!" };

    $scope.joinRoom = function (msg) {
        room = msg;
        socket.emit("join", room);
    };

    $scope.pauseGame = function () {
        socket.emit("pause", room);
    };

    $scope.resumeGame = function () {
        socket.emit("resume", room);
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


}])