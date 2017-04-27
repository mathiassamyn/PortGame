app.controller("loginCtrl", ["$scope", "$location", "$http", function ($scope, $location, $http) {

    $scope.toGame = function (guide, team, username) {
        if (guide !== undefined && team !== undefined && username !== undefined) {
            guide = guide.split(" ");
            var data = {
                FirstName: guide[0],
                LastName: guide[1],
                Team: team,
                Username: username
            };
            $http.post('/login', data).then(
                //TODO: Maybe get back ID's and use these to go to next screen
                function successCallback(response) {
                    console.log(response);
                    $location.path("/map/" + guide + "/" + team + "/" + username);
                },
                function errorCallback(response) {
                    console.log(response);
                });           
        }
    }

    //for testing purposes
    $scope.guideList = [
        "Ted Mosby",
        "Marshall Eriksen",
        "Barney Stinson"
    ]

    $scope.teamList = [
        "red",
        "green",
        "orange",
        "blue"
    ]
}])
