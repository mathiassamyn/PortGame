// factory we use to keep track of all the changes on the map by listening to the websockets

app.factory('mapChanges', ["$http", "socket", function ($http, socket) {

    this.manufacturing = this.logistics = {};
  
    var getOwner = function (region) {
        $http.get("/owner/" + region).then(
            function successCallback(response) {
                for (var i = 0; i < response.data.length; i++) {
                    this[region] = {
                        teamID: response.data[i][0].value,
                        team: response.data[i][1].value
                    };
                }              
            },
            function errorCallback(response) {
                console.log(response);
            });
    }

    getOwner("manufacturing");
    getOwner("logistics");
    setTimeout(function(){ console.log(this.manufacturing); }, 3000);

    socket.on("region", function (msg) {
       
    })

    return {
        manufacturing: this.manufacturing,
        logistics: this.logistics
    };
}]);