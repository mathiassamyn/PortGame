app.controller("mapCtrl", ["$scope", "socket", function ($scope, socket) {
    $scope.region1 = $scope.region2 = $scope.region3 = "Unowned";

    $scope.regionOwner = function (id, score) {
        var msg = {
            region: id,
            team: $scope.team,
            room: $scope.room,
            user: $scope.user,
            score: score
        };
        socket.emit("region", msg);
    };

    socket.on("new region owner", function (data) {
        $scope[data.region] = data.team;
        $scope.$apply();
    });
}])