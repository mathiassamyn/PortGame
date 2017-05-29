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





                    //needs to be put into factory, because duplicate of gamemasterctrl function
                    //REGIONS
                    //TODO: use cookies to track ownership, instead of doing http call at every reload
                    //this function will give null if the user still has to log in, This means that if the game has already
                    //started, then they won't see the region owners.
                    //This will be used when the user reloads the page. This way he will have the right region owners from the start.
                    //Maybe also use this function after log in
                    var getOwner = function (region) {
                        $http.get("/owner/" + region).then(
                            function successCallback(response) {
                                if (response.data.length > 0) {
                                    //$cookies.put(region, {
                                    //    teamID: response.data[0][0].value,
                                    //    team: response.data[0][1].value
                                    //})
                                    $scope[region] = {
                                        teamID: response.data[0][0].value,
                                        team: response.data[0][1].value
                                    };
                                } else {
                                    console.log("in else");
                                    console.log(region);
                                    console.log($scope[region]);
                                    $scope[region] = {

                                        teamID: null,

                                        team: null

                                    };

                                };
                                console.log(region);
                                console.log($scope[region]);

                            },
                            function errorCallback(response) {
                                console.log(response);
                            });
                    }

                    var regions = [];
                    //in the end this can be added to the same if statement at the top of the doc
                    //if (guide !== undefined) {
                    initData.then(function (response) {
                        regions = response.regions;
                        for (var i = 0; i < regions.length; i++) {
                            //$cookies.put(regions[i].name, {
                            //    teamID: null,
                            //    team: null
                            //});
                            getOwner(regions[i].name);
                            $scope[regions[i].name + "product"] = 0;
                        }
                    });
                    //}







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
