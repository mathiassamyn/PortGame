app.controller("marketCtrl", ["$scope", "returningHttpCalls", "$q", "$http", function ($scope, returningHttpCalls, $q, $http) {

    returningHttpCalls.getProducts().then(function (response) {
        $scope.productAmount = response;
    })

    $scope.productSelected = {
        manufacturing: false,
        terminal: false,
        logistics: false,
        greyManufacturing: false,
        food: false,
        cars: false,
        environment: false
    }

    $scope.marketSelected = angular.copy($scope.productSelected); //this will make sure that this object is not a reference to productSelected

    $scope.marketSubmit = function () {
        var prom = [];
        prom.push(angular.forEach($scope.productSelected, function (value, key) {
            if (value && $scope.productAmount[key] === 0) {
                $scope.productSelected[key] = false;
            } 
        }));

        $q.all(prom).then(function () {
            $http.post("/trade", { playerProducts: $scope.productSelected, marketProducts: $scope.marketSelected }).then(
                function successCallback(response) {
                    console.log(response);
                },
                function errorCallback(response) {
                    console.log(response);
                }
             )
        });
    }

}])