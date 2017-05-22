app.controller("inventoryCtrl", ["$scope", "$http", "returningHttpCalls", "socket", function ($scope, $http, returningHttpCalls, socket) {

    returningHttpCalls.getProducts().then(function (response) {
        $scope.productAmount = response;
    })

    //socket.on("newProduct", function () {
    //    console.log("in newProduct");
    //    returningHttpCalls.getProducts().then(function (response) {
    //        $scope.productAmount = response;
    //    })
    //})

}])