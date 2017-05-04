app.controller("waitCtrl", ["$scope", "$location", "$http", function ($scope, $location, $http) {
    $http.get("/guideStarted").then(
        function successCallback(response) {
            if (response.data[0][0].value == true) {
                $location.path("/map");
            }
        },
        function errorCallback(response) {
            console.log(response);
        });
}])