app.factory('returningHttpCalls', ["$http", function ($http) {
    
    return {
        getProducts:
            function () {
                return $http.get("/products").then(
                    function successCallback(response) {
                        var products = response.data[0];
                        return productAmount = {
                            manufacturing: products[1].value,
                            terminal: products[2].value,
                            logistics: products[3].value,
                            greyManufacturing: products[4].value,
                            food: products[5].value,
                            cars: products[6].value,
                            environment: products[7].value
                        }
                    },
                    function errorCallback(response) {
                        console.log(response);
                    }
                );
            }
    }
}]);