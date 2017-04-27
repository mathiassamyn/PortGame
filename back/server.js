var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(express.static("../front"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

//function getTopFive() {
//    request = new Request("SELECT PLAYER_ID FROM Scores ORDER BY Score DESC",
//        function (err, rowCount, rows) {
//            console.log(rowCount + " row(s) returned");
//            console.log(rows);
//        }
//    );

//    request.on("row", function (columns) {
//        columns.forEach(function (column) {
//            console.log("%s\t%s", column.metadata.colName, column.value);
//        });
//    });

//    connection.execSql(request);
//}

//API calls
app.post("/login", function (req, res) {
    console.log(req.body);
    //TODO: check if name already exists
    //TODO: put this in seperate files
    var query = "declare @username varchar(255), " +
                    "@firstname varchar(255), " +
                    "@lastname varchar(255), " +
                    "@teamName varchar(255), " +
                    "@guideID int, " +
                    "@teamID int; " +

        "set @username = '" + req.body.Username + "'; " +
        "set @firstname = '" + req.body.FirstName + "'; " +
        "set @lastname = '" + req.body.LastName + "'; " +
        "set @teamName = '" + req.body.Team + "'; " +

        "select @guideID = GUIDE_ID from Guides " +
        "where FirstName = @firstname and LastName = @lastname; " +

        "select @teamID = TEAM_ID from Teams " +
        "where Name = @teamName; " +

        "insert into Players (Name, GUIDE_ID, TEAM_ID) " +
        "values (@username, @guideID, @teamID); ";

    console.log(query);
    request = new Request(query,
            function (err, rowCount, rows) {
                if (err) {
                    res.status(500).send("Something went wrong");
                } else res.status(200).send("Player successfully added");
            }
        );
    connection.execSql(request);
})


//data for testing
var scoreObject = {
    username: "",
    team: "",
    score: 0
}
var scores1 = scores2 = scores3 = [scoreObject, scoreObject, scoreObject, scoreObject, scoreObject];

//socket.io

var server = require("http").Server(app);
var io = require("socket.io")(server);

io.on("connection", function (socket) {
    socket.on("join", function (room) {
        socket.join(room);
    });
    socket.on("pause", function (room) {
        socket.to(room).emit("pause", "the game has been paused");
    });
    socket.on("resume", function (room) {
        socket.to(room).emit("resume", "the game has been resumed");
    });
    socket.on("region", function (data) {
        //for demo, normally the database will be used
        var scoreData = {
            username: data.username,
            team: data.team,
            score: data.score
        }
        if (data.region === "region1") {
            data.team = owner(scores1, scoreData);
        } else if (data.region === "region2") {
            data.team = owner(scores2, scoreData);
        } else if (data.region === "region3") {
            data.team = owner(scores3, scoreData);
        }

        io.in(data.room).emit("new region owner", data);
    });
});

var owner = function (scoreArray, scoreData) {
    scoreArray = addScore(scoreArray, scoreData);
    console.log(scoreArray);
    var sortArray = Object.create(scoreArray);
    return getOwner(sortArray);
}

var addScore = function (scoreArray, scoreData) {
    for (var i = 0; i < scoreArray.length; i++) {
        if (scoreArray[i].score < scoreData.score) {
            scoreArray.splice(i, 0, scoreData);
            break;
        }
    }
    var nameCount = 0;
    for (var i = 0; i < scoreArray.length; i++) {
        if (scoreArray[i].username === scoreData.username) {
            nameCount++;
            if (nameCount > 1) {
                scoreArray.splice(i, 1);
                break;
            }
        }
    }
    return scoreArray.slice(0, 5);
}

var getOwner = function (scoreArray) {
    scoreArray.sort(sort_by("team", true, function (a) { return a.toUpperCase() }));

    var scores = [];
    var index = 0;
    scores[index] = {
        team: scoreArray[0].team,
        score: scoreArray[0].score
    }

    for (var i = 1; i < scoreArray.length; i++) {
        if(scoreArray[i].team === scores[index].team) {
            scores[index].score += scoreArray[i].score;
        } else {
            index++;
            scores[index] = {
                team: scoreArray[i].team,
                score: scoreArray[i].score
            }
        }
    }
    
    scores.sort(sort_by("score", true, parseInt));
    return scores[0].team;
}

var sort_by = function (field, reverse, primer) {

    var key = primer ?
        function (x) { return primer(x[field]) } :
        function (x) { return x[field] };

    reverse = !reverse ? 1 : -1;

    return function (a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }
}

server.listen(3000, function () {
    console.log("server up and running at 3000 port");
});