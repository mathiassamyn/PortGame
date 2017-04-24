app.controller("loginCtrl", ["$scope", "$location", function ($scope, $location) {

    $scope.toGame = function (guide) {
        $location.path("/game/" + guide);
    }

    //for testing purposes
    $scope.guideList = [
        "jef",
        "peter",
        "tom",
        "michiel"
    ]

    $scope.teamList = [
        "team 1",
        "team 2",
        "team 3",
        "team 4",
        "team 5"
    ]
}])
