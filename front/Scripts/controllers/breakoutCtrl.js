app.controller("breakoutCtrl", ["$scope", function ($scope) {
    //stolen and modified from https://github.com/end3r/Gamedev-Canvas-workshop/blob/gh-pages/lesson10.html
    if (window.DeviceMotionEvent) {
        window.addEventListener("devicemotion", deviceMotionHandler, true);
    } else {
        console.log("DeviceMotionEvent is not supported");
    }
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var ballRadius = 10;
    var x = canvas.width / 2;
    var y = canvas.height - 30;
    var dx = 5;
    var dy = -5;
    var paddleHeight = 10;
    var paddleWidth = 75;
    var paddleX = (canvas.width - paddleWidth) / 2;
    var rightPressed = false;
    var leftPressed = false;
    var brickHeight = 20;
    var brickPadding = 10;
    var brickOffsetTop = 30;
    var brickRowCount = 10;
    var brickWidth = Math.floor(canvas.width / brickRowCount);
    var brickColumnCount = 5;
    var brickOffsetLeft = (canvas.width - (brickRowCount * brickWidth))/2;
    var score = 0;
    var lives = 3;
    var bricks = [];
    for (c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }
    //document.addEventListener("keydown", keyDownHandler, false);
    //document.addEventListener("keyup", keyUpHandler, false);
    //document.addEventListener("mousemove", mouseMoveHandler, false);
    //function keyDownHandler(e) {
    //    if (e.keyCode == 39) {
    //        rightPressed = true;
    //    }
    //    else if (e.keyCode == 37) {
    //        leftPressed = true;
    //    }
    //}
    //function keyUpHandler(e) {
    //    if (e.keyCode == 39) {
    //        rightPressed = false;
    //    }
    //    else if (e.keyCode == 37) {
    //        leftPressed = false;
    //    }
    //}
    function deviceMotionHandler(event) {
        var rotation = event.accelerationIncludingGravity;
        event.interval = 2000;
        if (screen.orientation.type === "landscape-primary" || screen.orientation.type === "landscape-secondary") {
            if (rotation.x > 1) {
                leftPressed = true;
            } else if (rotation.x < -1) {
                rightPressed = true;
            } else {
                rightPressed = leftPressed = false;
            }
        } else {
            if (rotation.y > 1) {
                leftPressed = true;
            } else if (rotation.y < -1) {
                rightPressed = true;
            } else {
                rightPressed = leftPressed = false;
            }
        }
    }
    //function mouseMoveHandler(e) {
    //    var relativeX = e.clientX - canvas.offsetLeft;
    //    if (relativeX > 0 && relativeX < canvas.width) {
    //        paddleX = relativeX - paddleWidth / 2;
    //    }
    //}
    function collisionDetection() {
        for (c = 0; c < brickColumnCount; c++) {
            for (r = 0; r < brickRowCount; r++) {
                var b = bricks[c][r];
                if (b.status == 1) {
                    if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                        dy = -dy;
                        b.status = 0;
                        score++;
                        if (score == brickRowCount * brickColumnCount) {
                            setTimeout(function () {
                                $scope.$emit('gameFinished', { game: "Break Out", score: score });
                            }, 1000);
                        }
                    }
                }
            }
        }
    }
    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    function drawBricks() {
        for (c = 0; c < brickColumnCount; c++) {
            for (r = 0; r < brickRowCount; r++) {
                if (bricks[c][r].status == 1) {
                    var brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
                    var brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = "#0095DD";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
    function drawScore() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Score: " + score, 8, 20);
    }
    function drawLives() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
    }
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        drawLives();
        collisionDetection();
        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if (y + dy < ballRadius) {
            dy = -dy;
        }
        else if (y + dy > canvas.height - ballRadius) {
            if (x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            }
            else {
                lives--;
                if (!lives) {
                    setTimeout(function () {
                        $scope.$emit('gameFinished', { game: "Break Out", score: score });
                    }, 1000);
                }
                else {
                    x = canvas.width / 2;
                    y = canvas.height - 30;
                    dx = 5;
                    dy = -5;
                    paddleX = (canvas.width - paddleWidth) / 2;
                }
            }
        }
        if (rightPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += 7;
        }
        else if (leftPressed && paddleX > 0) {
            paddleX -= 7;
        }
        x += dx;
        y += dy;
        requestAnimationFrame(draw);
    }
    draw();
}]);