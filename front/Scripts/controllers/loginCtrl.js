app.controller("loginCtrl", ["$scope", "$location", "$http", "initData", "$cookies", function ($scope, $location, $http, initData, $cookies) {

    $scope.toGame = function (guide, team, username) {
        if (guide !== undefined && team !== undefined && username !== undefined) {
            $cookies.put("guideID", guide);
            $cookies.put("teamID", team);          
            $http.post("/login", { username: username }).then(
                function successCallback(response) {                     
                    $cookies.put("playerID", response.data[0][0].value);
                    $location.path("/map");
                },
                function errorCallback(response) {
                    console.log(response);
                });           
        }
    }

    $scope.guideList = initData.guides;
    $scope.teamList = initData.teams;
}])
