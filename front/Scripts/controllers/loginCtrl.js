app.controller("loginCtrl", ["$scope", "$location", function ($scope, $location) {

    $scope.toGame = function (guide, team, username) {
        if (guide !== undefined && team !== undefined && username !== undefined) {
            $location.path("/map/" + guide + "/" + team + "/" + username);
        }
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
