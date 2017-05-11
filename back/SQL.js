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
                        console.log(err);
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
    var query = "insert into Players (Name, GUIDE_ID, TEAM_ID) " +
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

exports.getGuideStarted = function (guideID, response) {
    var query = "select Started from Guides where GUIDE_ID = " + guideID;
    executeQuery(query, response);
}

exports.setGuideStarted = function (guideID, started, response) {
    var query = "update Guides set Started = " + started + " where GUIDE_ID = " + guideID;
    executeQuery(query, response);
}

exports.getMinigames = function (response) {
    var query = "select regions.Name, minigames.Name, Basegame " +
                "from minigames " +
                "inner join regions on minigames.REGION_ID = regions.REGION_ID " +
                "order by regions.name ";

    executeQuery(query, response);
}

exports.getRegions = function (response) {
    var query = "select REGION_ID, name from regions;";
    executeQuery(query, response);
}

exports.setScore = function (playerID, game, score, response) {
    var query = "declare @minigame_id int; " +
        "set @minigame_id = (select minigame_id from minigames where name = '" + game + "'); " +
        "declare @score int; " +
        "set @score = (select MAX(score) from scores where player_id = " + playerID + "); " +
        "if @score is NULL set @score = -1; " +
        "if @score < " + score + " insert into scores (score, player_id, minigame_id) values (" + score + "," + playerID + ", @minigame_id); delete from scores where score_id <>(select MAX(score_id) from scores where player_id = " + playerID + ") and player_id = " + playerID + "; " +
        "update Players " +
        "set Coins += " + score + " " +
        "where PLAYER_ID = " + playerID;


    executeQuery(query, response);
}

exports.getOwner = function (guideID, region, response) {
    var query = "declare @guide_id int, @minigame_id int, @region varchar(255), @region_id int; " +
                "set @guide_id = " + guideID + "; " +
                "set @region = '" + region + "'; " +
                "set @region_id = (select region_id from regions where name = @region); " +
                "set @minigame_id = (select minigame_id from minigames where basegame = 1 and region_id = @region_id); " +

                "select teams.team_id, teams.name from teams " +
                "inner join ( " +
                    "select top 1 name, sum(score) score from ( " +
                        "select top 5 score, teams.name from scores " +
                        "inner join players on scores.player_id = players.player_id " +      
                        "inner join teams on players.team_id = teams.team_id " +
                        "inner join minigames on minigames.minigame_id = scores.minigame_id " +
                        "where players.guide_id = @guide_id and minigames.minigame_id = @minigame_id " +
                        "order by score desc) as top5 " +
                    "group by name " +
                    "order by score desc) as winner " +
                "on teams.name = winner.name; "

    executeQuery(query, response);
}

exports.getTopFive = function (guideID, game, response) {
    var query = "declare @guide_id int, @minigame_id int, @game varchar(255); " +
                "set @guide_id = " + guideID + "; " +
                "set @game = '" + game + "'; " +
                "set @minigame_id = (select minigame_id from minigames where name = @game); " +

                "select top 5 players.name, teams.name, score from scores " +
                "inner join players on scores.player_id = players.player_id " +
                "inner join teams on players.team_id = teams.team_id " +
                "inner join minigames on minigames.minigame_id = scores.minigame_id " +
                "where players.guide_id = @guide_id and minigames.minigame_id = @minigame_id " +
                "order by score desc; "

    executeQuery(query, response);
}

