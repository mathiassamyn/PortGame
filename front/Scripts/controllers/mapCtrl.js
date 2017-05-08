app.controller("mapCtrl", ["$scope", "$cookies", "$state", "mapChanges", function ($scope, $cookies, $state, mapChanges) {

    console.log(mapChanges.manu);
    setTimeout(function () { console.log(mapChanges.manufacturing); }, 3000);
    $scope.manufacturing = mapChanges.manufacturing;
    $scope.logistics = mapChanges.logistics;

    $scope.regionView = function (region) {
        $state.go("region." + region, { region: region });
    }
}])