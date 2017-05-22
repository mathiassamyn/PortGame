app.controller("marketCtrl", ["$scope", "returningHttpCalls", function ($scope, returningHttpCalls) {

    returningHttpCalls.getProducts().then(function (response) {
        $scope.productAmount = response;
    })

}])