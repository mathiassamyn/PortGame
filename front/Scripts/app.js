var app = angular.module("Port Game", ["ngRoute", "ngCookies"]);

//To change the title for every view
app.run(['$rootScope', function ($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);

   