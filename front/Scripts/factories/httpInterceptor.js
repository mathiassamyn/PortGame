app.factory('httpInterceptor', ['$injector', '$q', '$timeout', function($injector, $q, $timeout) {
    return {
        'responseError': function(response) {
            if (response.status === 0) {
                console.log("in http interceptor");
                return $timeout(function() {
                    var $http = $injector.get('$http');
                    console.log($http);
                    console.log(response.config);
                    return $http(response.config);
                }, 5000);
            }
            return $q.reject(response);
        }
    };
}])

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
});