app.controller("gameMasterCtrl", ["$scope", "socket", "$cookies", "$state", "$http", "initData", "$timeout","$stateParams", function ($scope, socket, $cookies, $state, $http, initData, $timeout, $stateParams) {
    
    //This will be used for players that reload the page, it allows them to reconnect to the websocket.
    var guide = $cookies.get("guideID");

    if (guide !== undefined) {
        socket.emit("join", guide);
    }else{
        socket.emit("join", $stateParams.guide);
    }

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
                };
            },
            function errorCallback(response) {
                $scope[region] = {
                    teamID: null,
                    team: null
                };
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

    socket.on("region", function (msg) {
        $scope.$apply(function () {
            $scope[msg.region] = {
                teamID: msg.teamID,
                team: msg.team
            };
            console.log($scope[msg.region]);
            //$cookies.put(msg.region, {
            //    teamID: msg.teamID,
            //    team: msg.team
            //});
            if (msg.teamID == $cookies.get("teamID")) {
                socket.emit("join", $cookies.get("guideID") + msg.region);
            } else socket.emit("leave", $cookies.get("guideID") + msg.region);
        });
    })

    socket.on("product", function (msg) {
        $scope.$apply(function () {
            console.log("new product");
            $scope[msg + "product"] += 1;
        }); 
    })


    //Admin functions
    $scope.viewEnabled = true;
    $scope.endGame = false;

	socket.on("pause", function () {
		$scope.$apply(function () {
			$scope.viewEnabled = false;
		});
	});

	socket.on("resume", function () {
		$scope.$apply(function () {
			$scope.viewEnabled = true;
		});
	});

	socket.on("start", function () {
		$scope.$apply(function () {
			$state.go("map");
		});
	});

	socket.on("stop", function () {
        console.log("STOP LOG");
	    $scope.$apply(function () {
	        $scope.endTime = "1 minute";
	        $scope.endGame = true;
	        $timeout(function () {
	            $scope.endTime = "30 seconds";
	        }, 30000)
	        $timeout(function () {
	            $scope.endGame = false;
	            $state.go("endresult");
	        }, 60000)
	    });
	});
}])