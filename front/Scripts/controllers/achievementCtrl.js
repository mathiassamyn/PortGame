app.controller("achievementCtrl", ["$scope", "$http", function ($scope, $http) {

    //maybe put all result (end result, achievement http calls in factory, so it only needs to load once
    //normally more achievements, work with sub-views and controllers for each sub-view
    $scope.ranking = [];
    $http.get("/individualCoins").then(
        function successCallback(response) {
            for (var i = 0; i < response.data.length; i++) {
                $scope.ranking[i] = {
                    player: response.data[i][0].value,
                    coins: response.data[i][1].value
                }
            }
        },
        function errorCallback(response) {
            console.log(response);
        });
}])