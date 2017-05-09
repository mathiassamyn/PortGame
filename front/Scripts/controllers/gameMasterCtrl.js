﻿app.controller("gameMasterCtrl", ["$scope", "socket", "$cookies", "$state", "$http", "initData", function ($scope, socket, $cookies, $state, $http, initData) {
    
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
                if (response.data.length > 0) {
                    $scope[region] = {
                        teamID: response.data[0][0].value,
                        team: response.data[0][1].value
                    };
                } else {
                    $scope[region] = {
                        teamID: null,
                        team: null
                    }
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
            $scope[regions[i].name + "product"] = 0;
        }
    });

    socket.on("region", function (msg) {
        $scope.$apply(function () {
            $scope[msg.region] = {
                teamID: msg.teamID,
                team: msg.team
            };
            if (msg.teamID == $cookies.get("teamID")) {
                socket.emit("join", guide + msg.region);
            } else socket.emit("leave", guide + msg.region);
        });
    })

    socket.on("product", function (msg) {
        $scope.$apply(function () {
            $scope[msg + "product"] += 1;
        });
    })


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