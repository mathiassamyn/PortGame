//factory used so we only have to get the initial data once.

app.factory('initData', ["$http", "$q", function ($http, $q) {
    var promises = [];
    var guideList = [];
    var teamList = [];
    var minigameList = [];
    var regionList = [];
     
    promises.push(
        $http.get("/guides").then(
            function successCallback(response) {
                for (var i = 0; i < response.data.length; i++) {
                    guideList[i] = {
                        id: response.data[i][2].value,
                        name: response.data[i][0].value + " " + response.data[i][1].value
                    }
                }
                return guideList;
            },
            function errorCallback(response) {
                console.log(response);
            }
        )
    );

    promises.push(
        $http.get("/teams").then(
            function successCallback(response) {
                for (var i = 0; i < response.data.length; i++) {
                    teamList[i] = {
                        id: response.data[i][1].value,
                        name: response.data[i][0].value
                    }
                }
                return teamList;
            },
            function errorCallback(response) {
                console.log(response);
            }
        )
    );

    promises.push(
        $http.get("/minigames").then(
            function succcessCallback(response) {
                for (var i = 0; i < response.data.length; i++) {
                    minigameList[i] = {
                        region: response.data[i][0].value,
                        game: response.data[i][1].value,
                        basegame: response.data[i][2].value
                    }
                }
                return minigameList;
            },
            function errorCallback(response) {
                console.log(response);
            }
        )
    );

    promises.push(
         $http.get("/regions").then(
            function successCallback(response) {
                for (var i = 0; i < response.data.length; i++) {
                    regionList[i] = {
                        regionID: response.data[i][0].value,
                        name: angular.lowercase(response.data[i][1].value)
                    }
                }
                return regionList;
            },
            function errorCallback(response) {
                console.log(response);
            }
        )
    );

    return $q.all(promises).then(function () {
        return {
            guides: guideList,
            teams: teamList,
            minigames: minigameList,
            regions: regionList
        };
    });
}]);