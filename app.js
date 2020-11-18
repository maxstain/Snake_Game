var snake = [{
        x: 200,
        y: 200
    },
    {
        x: 190,
        y: 200
    },
    {
        x: 180,
        y: 200
    },
    {
        x: 170,
        y: 200
    },
    {
        x: 160,
        y: 200
    }
]

var score = 0;
var changing_direction = false;
var foodx;
var foody;
var dx = 10;
var dy = 0;
const snakeboard = document.getElementById("snakeboard");
const snakeboard_ctx = snakeboard.getContext("2d");
const msg = document.getElementById("message");
main();

gen_food();

document.addEventListener("keydown", change_direction);

function main() {

    if (has_game_ended()) return;

    changing_direction = false;
    setTimeout(function onTick() {
        clear_board();
        drawFood();
        move_snake();
        drawSnake();
        main();
    }, 100);
}

function clear_board() {
    snakeboard_ctx.fillStyle = "white";
    snakeboard_ctx.strokestyle = "black";
    snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

function drawSnake() {
    snake.forEach(drawSnakePart)
}

function drawSnakePart(snakePart) {
    snakeboard_ctx.fillStyle = "green";
    snakeboard_ctx.strokestyle = "black";
    snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawFood() {
    snakeboard_ctx.fillStyle = "red";
    snakeboard_ctx.strokestyle = "black";
    snakeboard_ctx.fillRect(foodx, foody, 10, 10);
    snakeboard_ctx.strokeRect(foodx, foody, 10, 10);
}


function has_game_ended() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y)
            return true;
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > snakeboard.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > snakeboard.height - 10;

    return (hitLeftWall || hitRightWall || hitToptWall || hitBottomWall) &&
        (msg.innerText = "Too bad, Press the 'r' key to restart") && true;
}

function random_food(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function gen_food() {
    foodx = random_food(0, snakeboard.width - 10);
    foody = random_food(0, snakeboard.height - 10);
    snake.forEach(function has_snake_eaten_food(part) {
        const has_eaten = part.x == foodx && part.y == foody;
        if (has_eaten) gen_food();
    });
}

function change_direction(e) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    if (changing_direction) return;
    changing_direction = true;
    const keyPressed = e.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;
    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
    }
}

function move_snake() {
    const head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };
    snake.unshift(head);
    const has_eaten_food = snake[0].x === foodx && snake[0].y === foody;
    if (has_eaten_food) {
        score += 10;
        document.getElementById('score').innerHTML = score;
        gen_food();
    } else {
        snake.pop();
    }
}

document.addEventListener("keypress", function (e) {
    if ((e.key == "r") && (has_game_ended() == true)) {
        location.reload();
    }
});