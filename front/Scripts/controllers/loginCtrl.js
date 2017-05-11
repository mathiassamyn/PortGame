app.controller("loginCtrl", ["$scope", "$state", "$http", "initData", "$cookies", "socket", function ($scope, $state, $http, initData, $cookies, socket) {

    //javascript solution to put the browser into fullscreen mode. This is not done automaticly,
    //because the browser requires the user to activate it.
    var setFullscreen = function () {
        var elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
    };

    $cookies.remove("guideID");
    $cookies.remove("teamID");
    $cookies.remove("playerID");

    $scope.toGame = function (guide, team, username) {
        if (guide !== undefined && team !== undefined && username !== undefined) {
            //setFullscreen();
            $cookies.put("guideID", guide);
            $cookies.put("teamID", team);          
            $http.post("/login", { username: username }).then(
                function successCallback(response) {                     
                    $cookies.put("playerID", response.data[0][0].value);
                    socket.emit("join", guide);
                    $state.go("wait");
                },
                function errorCallback(response) {
                    console.log(response);
                });           
        }
    }

    initData.then(function (response) {
        $scope.guideList = response.guides;
        $scope.teamList = response.teams;
    });
}])
