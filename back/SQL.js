//db connection using tedious
var ConnectionPool = require('tedious-connection-pool');
var Request = require("tedious").Request;
var DBConfig = require("./DBConfig.json");

var poolConfig = {
    min: 10,
    max: 60,
    log: true
};

//create the pool
var pool = new ConnectionPool(poolConfig, DBConfig);

pool.on('error', function (err) {
    console.error(err);
});

//acquire a connection
function executeQuery(query, response) {
    pool.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }

        var data = [];
        var i = 0;

        request = new Request(query,
                function (err, rowCount) {
                    if (err) {
                        response.status(500).send(err);
                    } else {
                        connection.release();
                        response.status(200).send(data);
                    }
                }
            );

        request.on('row', function (columns) {
            data[i] = columns;
            i++;
        });

        connection.execSql(request);
    });
}

exports.addUser = function (username, teamID, guideID, response) {
    var query =
            "insert into Players (Name, GUIDE_ID, TEAM_ID) " +
            "output inserted.PLAYER_ID " +
            "values ('" + username + "', '" + guideID + "', '" + teamID + "');";

    executeQuery(query, response);
}

exports.getGuides = function (response) {
    var query = "select FirstName, LastName, GUIDE_ID from Guides";
    executeQuery(query, response)
}

exports.getTeams = function (response) {
    var query = "select Name, TEAM_ID from Teams";
    executeQuery(query, response)
}
