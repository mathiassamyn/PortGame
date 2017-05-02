app.controller("gameMasterCtrl", ["$scope", "socket", "$cookies", "$location", function ($scope, socket, $cookies, $location) {

    $scope.viewEnabled = true;
    socket.on("pause", function () {
        $scope.$apply(function () {
            $scope.viewEnabled = false;
        });
    });

    socket.on("resume", function () {
        $scope.$apply(function () {
            $scope.viewEnabled = true;
        });
    });

    socket.on("start", function () {
        $scope.$apply(function () {
            $location.path("/map");
        });
    });

    socket.on("stop", function () {
        //TODO: make stop function
    });

}])