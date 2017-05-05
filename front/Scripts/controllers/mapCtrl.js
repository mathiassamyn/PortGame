app.controller("mapCtrl", ["$scope", "$cookies", "$state", function ($scope, $cookies, $state) {

    var room = $cookies.get("guideID");

    $scope.region1 = $scope.region2 = $scope.region3 = "Unowned";

    $scope.regionView = function (region) {
        //$location.path("/region/" + region);
        $state.go("region", { region: region });
    }
}])