app.controller("adminCtrl", ["$scope", "socket", "$cookies", "$routeParams", function ($scope, socket, $cookies, $routeParams) {
    $cookies.put("guideID", $routeParams.guide);
}])