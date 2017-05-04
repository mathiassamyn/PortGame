app.controller("mapCtrl", ["$scope", "$cookies", "$location", function ($scope, $cookies, $location) {

    var room = $cookies.get("guideID");

    $scope.region1 = $scope.region2 = $scope.region3 = "Unowned";

    $scope.regionView = function (region) {
        $location.path("/region/" + region);
    }
}])