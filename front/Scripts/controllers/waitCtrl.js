app.controller("waitCtrl", ["$scope", "$state", "$http", function ($scope, $state, $http) {
    $http.get("/guideStarted").then(
        function successCallback(response) {
            if (response.data[0][0].value == true) {
                $state.go("map");
            }
        },
        function errorCallback(response) {
            console.log(response);
        });
}])