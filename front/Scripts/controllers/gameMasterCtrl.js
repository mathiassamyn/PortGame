app.controller("gameMasterCtrl", ["$scope", "socket", "$cookies", "$state", "$http", "$parse", function ($scope, socket, $cookies, $state, $http, $parse) {

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

    $scope.manufacturing = $scope.logistics = "";
    getOwner("manufacturing");
    getOwner("logistics");

    socket.on("region", function (msg) {
        $scope.$apply(function () {
            $scope[msg.region] = {
                teamID: msg.teamID,
                team: msg.team
            };
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