app.controller("gameMasterCtrl", ["$scope", "socket", "$cookies", "$state", "$http", "$parse", "$interval", "initData", function ($scope, socket, $cookies, $state, $http, $parse, $interval, initData) {

    //This will be used for players that reload the page, it allows them to reconnect to the websocket.
    var guide = $cookies.get("guideID");

    if (guide !== undefined) {
        socket.emit("join", guide);
    }

    //REGIONS

    //This will be used when the user reloads the page. This way he will have the right region owners from the start.
    var getOwner = function (region) {
        $http.get("/owner/" + region).then(
            function successCallback(response) {
                console.log(response);
                if (response.data.length > 0) {
                    $scope[region] = {
                        teamID: response.data[0][0].value,
                        team: response.data[0][1].value
                    };
                }
            },
            function errorCallback(response) {
                console.log(response);
            });
    }
    
    var regions = [];

    initData.then(function(response) {
        regions = response.regions;

        for (var i = 0; i < regions.length; i++) {
            $cookies.put(regions[i].name, false);
            getOwner(regions[i].name);

        }
    });

    socket.on("region", function (msg) {
        $scope.$apply(function () {
            $scope[msg.region] = {
                teamID: msg.teamID,
                team: msg.team
            };
            console.log(msg.teamID + " " + $cookies.get("teamID"));
            if (msg.teamID == $cookies.get("teamID")) {
                //getProducts(msg.region);

            }
        });
    })

    //var getProducts = function (region) {
    //    $interval(function (region) {
    //        console.log("added 1 product to: " + region);
    //    }, 1000);
    //}


    //Admin functions
	$scope.viewEnabled = true;

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
		$scope.$apply(function () {
			$state.go("endresult");
		});
	});
}])