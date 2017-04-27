app.controller("loginCtrl", ["$scope", "$location", "$http", function ($scope, $location, $http) {

    $scope.toGame = function (guide, team, username) {
        if (guide !== undefined && team !== undefined && username !== undefined) {
            var data = {
                guideID: guide,
                teamID: team,
                username: username
            }
            $http.post("/login", data).then(
                function successCallback(response) {
                    $location.path("/map/" + guide + "/" + team + "/" + username);
                },
                function errorCallback(response) {
                    console.log(response);
                });           
        }
    }

    $scope.guideList = [];
    $scope.teamList = [];

    $http.get("/guides").then(
        function successCallback(response) {
            for (var i = 0; i < response.data.length; i++) {
                $scope.guideList[i] = {
                    id: response.data[i][2].value,
                    name: response.data[i][0].value + " " + response.data[i][1].value
                }
            }
        },
        function errorCallback(response) {
            console.log(response);
        });

    $http.get("/teams").then(
        function successCallback(response) {
            for (var i = 0; i < response.data.length; i++) {
                $scope.teamList[i] = {
                    id: response.data[i][1].value,
                    name: response.data[i][0].value
                }
            }
        },
        function errorCallback(response) {
            console.log(response);
        });

    //for testing purposes
    //$scope.guideList = [
    //    {
    //        name: "Ted Mosby",
    //        id: 1
    //    },
    //    {
    //        name: "Marshall Eriksen",
    //        id: 2
    //    },
    //    {
    //        name: "Barney Stinson",
    //        id: 3
    //    }
    //]

    //$scope.teamList = [
    //     {
    //         name: "green",
    //         id: 1
    //     },
    //    {
    //        name: "red",
    //        id: 2
    //    },
    //    {
    //        name: "orange",
    //        id: 3
    //    },
    //    {
    //        name: "blue",
    //        id: 4
    //    }
    //]
}])
