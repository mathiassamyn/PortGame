//db connection using tedious
var ConnectionPool = require('tedious-connection-pool');
var Request = require("tedious").Request;
var DBConfig = require("./DBConfig.json");

var poolConfig = {
    min: 10,
    max: 60,
    retryDelay: 100
    //log: true
};

//create the pool
var pool = new ConnectionPool(poolConfig, DBConfig);

pool.on('error', function (err) {
    console.log("in pool error");
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
    var query = "declare @guide_id int, @team_id int, @username varchar(255); " +
                "set @guide_id = " + guideID + "; " +
                "set @team_id = " + teamID + "; " +
                "set @username = '" + username + "'; " +
                "insert into Players (Name, GUIDE_ID, TEAM_ID) " +
                "output inserted.PLAYER_ID " +
                "values (@username, @guide_id, @team_id); " +
                "if not exists (select * from inventory where guide_id = @guide_id and team_id = @team_id) " +
                "insert into inventory (team_id, guide_id) values (@team_id, @guide_id); ";

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

exports.setScore = function (playerID, game, score, region, response) {
    var query = "declare @minigame_id int, @region_id int; " +
        "set @region_id = (select region_id from regions where name = '" + region + "'); " +
        "set @minigame_id = (select minigame_id from minigames where name = '" + game + "' and REGION_ID = @region_id); " +
        "declare @score int; " +
        "set @score = (select MAX(score) from scores where player_id = " + playerID + " and minigame_id = @minigame_id); " +
        "if @score is NULL set @score = -1; " +
        "if @score < " + score + " insert into scores (score, player_id, minigame_id) values (" + score + "," + playerID + ", @minigame_id); delete from scores where score_id <>(select MAX(score_id) from scores where player_id = " + playerID + " and minigame_id = @minigame_id) and player_id = " + playerID + " and minigame_id = @minigame_id; " +
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

exports.getTopFive = function (guideID, game, region, response) {
    var query = "declare @guide_id int, @minigame_id int, @region_id int, @game varchar(255); " +
                "set @guide_id = " + guideID + "; " +
                "set @game = '" + game + "'; " +
                "set @region_id = (select region_id from regions where name = '" + region + "'); " +
                "set @minigame_id = (select minigame_id from minigames where name = @game and region_id = @region_id); " +

                "select top 5 players.name, teams.name, score from scores " +
                "inner join players on scores.player_id = players.player_id " +
                "inner join teams on players.team_id = teams.team_id " +
                "inner join minigames on minigames.minigame_id = scores.minigame_id " +
                "where players.guide_id = @guide_id and minigames.minigame_id = @minigame_id " +
                "order by score desc; "

    executeQuery(query, response);
}

exports.getCoins = function (playerID, response) {
    var query = "select Coins from Players where PLAYER_ID = " + playerID;
    executeQuery(query, response);
}

exports.getEndResult = function (guideID, response) {
    var query = "select Name, SUM(Coins) Coins from( " +
                "select Teams.Name, Players.Coins from Players " +
                "inner join Teams on Players.TEAM_ID = Teams.TEAM_ID " +
                "where GUIDE_ID = " + guideID + ") as teamCoins " +
                "group by Name " +
                "order by Coins desc; ";

    executeQuery(query, response);
}

exports.getIndividualCoins = function (guideID, response) {
    var query = "select Name, Coins from Players where GUIDE_ID = " + guideID + " order by Coins desc;";
    executeQuery(query, response);
}

exports.addProduct = function (teamID, guideID, region, response) {
    var query = "update Inventory " +
                "set " + region + " += 1 " +
                "where guide_id = " + guideID + " and team_id = " + teamID + "; ";

    executeQuery(query, response);
}

exports.getProducts = function (teamID, guideID, response) {
    var query = "select * from Inventory where team_id = " + teamID + " and guide_id = " + guideID + "; ";
    executeQuery(query, response);
}

exports.tradeProduct = function (teamID, guideID, playerProduct, marketProduct, response) {
    var query = "update inventory " +
                "set " + playerProduct + " -= 1, " + marketProduct + " += 1 " +
                "where guide_id = " + guideID + " and team_id = " + teamID + "; ";

    executeQuery(query, response);
}

exports.clearDatabase = function (guideID, response) {
    var query = "declare @guide_id int; " +
                "set @guide_id = " + guideID + "; " +
                "delete Scores from Players inner join Scores on Players.player_id = Scores.player_id where guide_id = @guide_id; " +
                "delete from players where guide_id = @guide_id; ";
                "delete from Inventory where guide_id = @guide_id; ";

                executeQuery(query, response);
}
