app.controller("mapCtrl", ["$scope", "$cookies", "$state", function ($scope, $cookies, $state) {

    $scope.regionView = function (region) {
        $state.go("region." + region, { region: region });
    }
}])