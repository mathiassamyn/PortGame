//factory used so we only have to get the initial data once.

app.factory('initData', function ($http) {
    var guideList = [];
    var teamList = [];
     
    $http.get("/guides").then(
        function successCallback(response) {
            console.log("after response");
            for (var i = 0; i < response.data.length; i++) {
                guideList[i] = {
                    id: response.data[i][2].value,
                    name: response.data[i][0].value + " " + response.data[i][1].value
                }
            }
        },
        function errorCallback(response) {
            console.log(response);
        });

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
        });

    return {
        guides: guideList,
        teams: teamList
    };
});