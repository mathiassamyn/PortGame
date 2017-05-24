app.controller("marketCtrl", ["$scope", "returningHttpCalls", function ($scope, returningHttpCalls) {

    returningHttpCalls.getProducts().then(function (response) {
        $scope.productAmount = response;
    })

    $scope.productSelected = $scope.marketSelected = {
        manufacturing: false,
        terminal: false,
        logistics: false,
        greyManufacturing: false,
        food: false,
        cars: false,
        environment: false
    }

    $scope.marketSubmit = function () {
        console.log($scope.productSelected);
        console.log($scope.marketSelected);

    }

}])