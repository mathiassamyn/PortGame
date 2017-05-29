app.controller("marketCtrl", ["$scope", "returningHttpCalls", "$q", "$http", function ($scope, returningHttpCalls, $q, $http) {

    var getProductAmount = function () {
        returningHttpCalls.getProducts().then(function (response) {
            $scope.productAmount = response;
        });
    };

    getProductAmount();

    var resetObjects = function () {
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
    }

    resetObjects();

    $scope.marketSubmit = function () {

        angular.forEach($scope.productSelected, function (productSelected, product) {
            if (productSelected) {
                angular.forEach($scope.marketSelected, function (marketSelected, market) {
                    if (marketSelected) {
                        $http.post("/trade", { product: product, market: market }).then(
                            function successCallback(response) {
                                getProductAmount();
                                resetObjects();
                                console.log(response);
                            },
                            function errorCallback(response) {
                                console.log(response);
                            }
                        )
                        return;
                    }
                })
                return;
            }
        })
    }

}])