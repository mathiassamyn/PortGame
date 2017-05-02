app.controller("mapCtrl", ["$scope", "socket", "$cookies", function ($scope, socket, $cookies) {

    var room = $cookies.get("guideID");

    //$scope.region1 = $scope.region2 = $scope.region3 = "Unowned";

    //$scope.regionOwner = function (id, score) {
    //    //TODO: relook at how this will be done, not working as suposed at the moment
    //    var msg = {
    //        region: id,
    //        team: $scope.team,
    //        room: $scope.room,
    //        user: $scope.user,
    //        score: score
    //    };
    //    socket.emit("region", msg);
    //};

    //socket.on("new region owner", function (data) {
    //    $scope[data.region] = data.team;
    //    $scope.$apply();
    //});
}])