//factory used so we only have to get the initial data once.

app.factory('initData', ["$http", function ($http) {
    var guideList = [];
    var teamList = [];
    var minigameList = [];
     
    $http.get("/guides").then(
        function successCallback(response) {
            for (var i = 0; i < response.data.length; i++) {
                guideList[i] = {
                    id: response.data[i][2].value,
                    name: response.data[i][0].value + " " + response.data[i][1].value
                }
            }
        },
        function errorCallback(response) {
            console.log(response);
        }
    );

    $http.get("/teams").then(
        function successCallback(response) {
            for (var i = 0; i < response.data.length; i++) {
                teamList[i] = {
                    id: response.data[i][1].value,
                    name: response.data[i][0].value
                }
            }
        },
        function errorCallback(response) {
            console.log(response);
        }
    );

    $http.get("/minigames").then(
        function succcessCallback(response) {
            for (var i = 0; i < response.data.length; i++) {
                minigameList[i] = {
                    region: response.data[i][0].value,
                    game: response.data[i][1].value,
                    basegame: response.data[i][2].value
                }
            }
        },
        function errorCallback(response) {
            console.log(response);
        }
    );

    return {
        guides: guideList,
        teams: teamList,
        minigames: minigameList
    };
}]);