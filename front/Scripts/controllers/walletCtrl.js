app.controller("walletCtrl", ["$scope", "$http", function ($scope, $http) {
    $http.get("/coins").then(
        function successCallback(response) {
            $scope.coins = response.data[0][0].value;
        },
        function errorCallback(response) {
            console.log(response);
        });
}])