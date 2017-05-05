app.controller("gameMasterCtrl", ["$scope", "socket", "$cookies", "$state", function ($scope, socket, $cookies, $state) {

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
            $state.go("map");
        });
    });

    socket.on("stop", function () {
        //TODO: make stop function
        $scope.$apply(function () {
            $state.go("endresult");
        });
    });

}])