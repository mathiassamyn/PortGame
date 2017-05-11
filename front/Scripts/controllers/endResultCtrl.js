app.controller("endResultCtrl", ["$scope", "$http", function ($scope, $http) {
    $scope.endResult = [];
    $http.get("/endResult").then(
        function successCallback(response) {
            for (var i = 0; i < response.data.length; i++) {
                $scope.endResult[i] = {
                    team: response.data[i][0].value,
                    coins: response.data[i][1].value
                }
            }
        },
        function errorCallback(response) {
            console.log(response);
        });
}])