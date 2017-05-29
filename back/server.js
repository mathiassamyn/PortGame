var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var SQL = require("./SQL.js");
var cookie = require("cookie");

app.use(express.static("../front"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//API calls
app.post("/login", function (req, res) {
    var cookies = cookie.parse(req.headers.cookie);
    SQL.addUser(req.body.username, cookies.teamID, cookies.guideID, res);
})

app.get("/guides", function (req, res) {
    SQL.getGuides(res);
})

app.get("/teams", function (req, res) {
    SQL.getTeams(res);
})

app.get("/minigames", function (req, res) {
    SQL.getMinigames(res);
})

app.get("/regions", function (req, res) {
    SQL.getRegions(res);
})

app.get("/guideStarted", function (req, res) {
    var cookies = cookie.parse(req.headers.cookie);
    SQL.getGuideStarted(cookies.guideID, res);
})

app.post("/guideStarted", function (req, res) {
    var cookies = cookie.parse(req.headers.cookie);
    SQL.setGuideStarted(cookies.guideID, req.body.started, res);
})

app.post("/score", function (req, res) {
    var cookies = cookie.parse(req.headers.cookie);
    console.log(req.body.data.game + " " + req.body.region + " " + req.body.data.score + " " + cookies.playerID);
    SQL.setScore(cookies.playerID, req.body.data.game, req.body.data.score, req.body.region, res);
})

app.get("/topFive/:region/:game", function (req, res) {
    var cookies = cookie.parse(req.headers.cookie);
    console.log(req.params.region + " " + req.params.game);
    SQL.getTopFive(cookies.guideID, req.params.game, req.params.region, res);
})

app.get("/owner/:region", function (req, res) {
    var cookies = cookie.parse(req.headers.cookie);
    SQL.getOwner(cookies.guideID, req.params.region, res);
})

app.get("/coins", function (req, res) {
    var cookies = cookie.parse(req.headers.cookie);
    SQL.getCoins(cookies.playerID, res);
})

app.get("/endResult", function (req, res) {
    var cookies = cookie.parse(req.headers.cookie);
    SQL.getEndResult(cookies.guideID, res);
})

app.get("/individualCoins", function (req, res) {
    var cookies = cookie.parse(req.headers.cookie);
    SQL.getIndividualCoins(cookies.guideID, res);
})

app.post("/addProduct", function (req, res) {
    var cookies = cookie.parse(req.headers.cookie);
    SQL.addProduct(cookies.teamID, cookies.guideID, req.body.region, res);
})

app.get("/products", function (req, res) {
    var cookies = cookie.parse(req.headers.cookie);
    SQL.getProducts(cookies.teamID, cookies.guideID, res);
})

app.post("/trade", function (req, res) {
    var cookies = cookie.parse(req.headers.cookie);
    SQL.tradeProduct(cookies.teamID, cookies.guideID, req.body.product, req.body.market, res);
})

app.post("clearDatabase", function (req, res) {
    var cookies = cookie.parse(req.headers.cookie);
    SQL.clearDatabase(cookies.guideID, res);
})

//socket.io

var server = require("http").Server(app);
var io = require("socket.io")(server);

io.on("connection", function (socket) {
    socket.on("join", function (room) {       
        socket.join(room, function () {
            console.log("new client joined room: " + room);
        });
        
    });
    socket.on("leave", function (room) {
        socket.leave(room, function () {
            console.log("client left room: " + room);
        });
    });
    socket.on("start", function (room) {
        socket.to(room).emit("start");
    });
    socket.on("stop", function (room) {
        io.in(room).emit("stop");
    });
    socket.on("pause", function (room) {
        socket.to(room).emit("pause");
    });
    socket.on("resume", function (room) {
        socket.to(room).emit("resume");
    });
    socket.on("region", function (data) {
        io.in(data.room).emit("region", data);
    });
    socket.on("product", function (data) {
        socketID = Object.keys(io.sockets.adapter.rooms[data.guide + data.region].sockets)[0]; 
        socket.to(socketID).emit("product", data.region);
    });
    //socket.on("newProduct", function (room) {
    //    io.in(room).emit("newProduct");
    //});
});

server.listen(3000, function () {
    console.log("server up and running at 3000 port");
});