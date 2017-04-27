//db connection using tedious
var Connection = require("tedious").Connection;
var Request = require("tedious").Request;
var DBConfig = require("./DBConfig.json");

var connection = new Connection(DBConfig);

connection.on("connect", function (err) {
    if (err) {
        console.log(err);
    } else console.log("Successfully connected to database");
});

function executeQuery(query, response) {
    request = new Request(query,
            function (err, rowCount, rows) {
                if (err) {
                    response.status(500).send("Something went wrong");
                } else response.status(200).send("Player successfully added");
            }
        );
    connection.execSql(request);
}

exports.addUser = function (username, firstName, LastName, Team, response) {
    var query = "declare @username varchar(255), " +
                        "@firstname varchar(255), " +
                        "@lastname varchar(255), " +
                        "@teamName varchar(255), " +
                        "@guideID int, " +
                        "@teamID int; " +

            "set @username = '" + username + "'; " +
            "set @firstname = '" + firstName + "'; " +
            "set @lastname = '" + LastName + "'; " +
            "set @teamName = '" + Team + "'; " +

            "select @guideID = GUIDE_ID from Guides " +
            "where FirstName = @firstname and LastName = @lastname; " +

            "select @teamID = TEAM_ID from Teams " +
            "where Name = @teamName; " +

            "insert into Players (Name, GUIDE_ID, TEAM_ID) " +
            "values (@username, @guideID, @teamID); ";

    executeQuery(query, response);
}
