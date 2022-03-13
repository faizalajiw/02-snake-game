CELL_SIZE = 20;
const CANVAS_SIZE = 600;
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
const DIRECTION = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
}

// const MOVE_INTERVAL = 120;
let move_interval;

function initPosition() {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
    }
}

function initHeadAndBody() {
    let head = initPosition();
    let body = [{ x: head.x, y: head.y }];
    return {
        head: head,
        body: body,
    }
}

function initDirection() {
    return Math.floor(Math.random() * 4);
}

function initSnake(color) {
    return {
        color: color,
        ...initHeadAndBody(),
        direction: initDirection(),
        score: 0,
    }
}
let snake = initSnake("blue");

let apples = [{
        position: initPosition(),
    },
    {
        position: initPosition(),
    }
];

let life = 3;
let drink = {
    position: initPosition(),
};

let level = [{
        //level 1
        speed: 120,
    },
    {
        //level 2
        speed: 110,
        wall: [{
            start: {
                x: 5,
                y: 15,
            },
            end: {
                x: 25,
                y: 15,
            }
        }],
    },
    {
        //level 3
        speed: 100,
        wall: [{
                start: {
                    x: 5,
                    y: 12,
                },
                end: {
                    x: 25,
                    y: 12,
                }
            },
            {
                start: {
                    x: 5,
                    y: 18,
                },
                end: {
                    x: 25,
                    y: 18,
                }
            }
        ],
    },
    {
        // level 4
        speed: 90,
        wall: [{
                start: {
                    x: 0,
                    y: 15,
                },
                end: {
                    x: 30,
                    y: 15,
                }
            },
            {
                start: {
                    x: 15,
                    y: 0,
                },
                end: {
                    x: 15,
                    y: 15,
                }
            }
        ],
    },
    {
        // level 5
        speed: 80,
        wall: [{
                start: {
                    x: 0,
                    y: 15,
                },
                end: {
                    x: 30,
                    y: 15,
                }
            },
            {
                start: {
                    x: 15,
                    y: 0,
                },
                end: {
                    x: 15,
                    y: 30,
                }
            }
        ],
    }
];
let current_level = 0;
let next_level = 1;

function drawCell(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawWall(ctx, wall) {
    for (let i = 0; i < wall.length; i++) {
        let start = wall[i].start;
        let end = wall[i].end;

        if (start.x == end.x) {
            ctx.fillRect(start.x * CELL_SIZE, start.y * CELL_SIZE, CELL_SIZE, (end.y - start.y) * CELL_SIZE);
        } else if (start.y == end.y) {
            ctx.fillRect(start.x * CELL_SIZE, start.y * CELL_SIZE, (end.x - start.x) * CELL_SIZE, CELL_SIZE);
        }
    }
}

function insertImage(ctx, x, y, name) {
    let image = document.createElement("img");
    image.src = `assets/${name}.png`;

    ctx.drawImage(image, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function getCurrentLevel(ctx, score) {

    if (score > 25) {
        ctx.fillText(`WIN`, 500, 580);
        return;
    }

    if (score >= 0 && score < 5) {
        current_level = 0;
    } else if (score >= 5 && score < 10) {
        current_level = 1;
    } else if (score >= 10 && score < 15) {
        current_level = 2;
    } else if (score >= 15 && score < 20) {
        current_level = 3;
    } else if (score >= 20 && score < 25) {
        current_level = 4;
    }

    if (current_level == next_level) {
        next_level++;
        let audio = new Audio('assets/level-up.mp3');
        audio.play();
    }

    move_interval = level[current_level].speed;
    ctx.fillText(`Level : ${current_level + 1}`, 500, 580);
    if (current_level > 0) {
        drawWall(ctx, level[current_level].wall);
    }
}

function checkPrime(number) {
    if (number < 2) {
        return false;
    }

    for (let i = 2; i < number; i++) {
        if (number % i == 0) {
            return false;
        }
    }
    return true;
}

function draw() {
    setInterval(function() {
        let snakeCanvas = document.getElementById("snakeBoard");
        let ctx = snakeCanvas.getContext("2d");

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        insertImage(ctx, snake.head.x, snake.head.y, "head1");

        for (let i = 1; i < snake.body.length; i++) {
            insertImage(ctx, snake.body[i].x, snake.body[i].y, "body1");
        }

        ctx.color = snake.color;
        ctx.font = "20px Arial";

        getCurrentLevel(ctx, snake.score);
        ctx.fillText("Score : " + snake.score, 485, 30);
        ctx.fillText("Speed : " + level[current_level].speed, 485, 50);

        for (let i = 0; i < apples.length; i++) {
            let apple = apples[i];
            insertImage(ctx, apple.position.x, apple.position.y, "apple");
        }

        for (let i = 0; i < life; i++) {
            insertImage(ctx, i, 0, "heart");
        }

        if (checkPrime(snake.score)) {
            insertImage(ctx, drink.position.x, drink.position.y, "potion");
        }
    }, REDRAW_INTERVAL);
}
// agar ular bisa tembus
function teleport(snake) {
    if (snake.head.x < 0) {
        snake.head.x = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.x >= WIDTH) {
        snake.head.x = 0;
    }
    if (snake.head.y < 0) {
        snake.head.y = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.y >= HEIGHT) {
        snake.head.y = 0;
    }
}

function eat(snake, apples, drink) {
    // Apel
    for (let i = 0; i < apples.length; i++) {
        let apple = apples[i];
        let AUDIO_EAT = new Audio('assets/eat.mp3');
        if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
            apple.position = initPosition();
            snake.score++;
            snake.body.push({ x: snake.head.x, y: snake.head.y });
            AUDIO_EAT.play();
        }
    }
    // Potion
    if (snake.head.x == drink.position.x && snake.head.y == drink.position.y) {
        let AUDIO_EAT = new Audio('assets/drink.mp3');
        drink.position = initPosition();
        snake.score++;
        snake.body.push({ x: snake.head.x, y: snake.head.y });
        AUDIO_EAT.play();
        life++;
    }
}

function moveLeft(snake) {
    snake.head.x--;
    teleport(snake);
    eat(snake, apples, drink);
}

function moveRight(snake) {
    snake.head.x++;
    teleport(snake);
    eat(snake, apples, drink);
}

function moveDown(snake) {
    snake.head.y++;
    teleport(snake);
    eat(snake, apples, drink);
}

function moveUp(snake) {
    snake.head.y--;
    teleport(snake);
    eat(snake, apples, drink);
}

function checkCollision() {
    let isCollide = false;

    // cek collision antara snake head dan snake body
    for (let i = 1; i < snake.body.length; i++) {
        if (snake.head.x == snake.body[i].x && snake.head.y == snake.body[i].y) {
            isCollide = true;
        }
    }

    // cek collision antara snake head dan wall
    if (current_level > 0) {
        let wall = level[current_level].wall;
        for (let i = 0; i < wall.length; i++) {
            if (snake.head.x >= wall[i].start.x && snake.head.x <= wall[i].end.x && snake.head.y >= wall[i].start.y && snake.head.y <= wall[i].end.y) {
                isCollide = true;
            }
        }
    }

    if (isCollide) {
        life--;
        snake.body.splice(0, snake.body.length);
        snake.body.push({ x: snake.head.x, y: snake.head.y });
        // sound game over
        if (life == 0) {
            let audio = new Audio('assets/game-over.mp3');
            audio.play();

            alert("Game over");
            snake = initSnake("purple");
        }
    }
}

function move(snake) {
    switch (snake.direction) {
        case DIRECTION.LEFT:
            moveLeft(snake);
            break;
        case DIRECTION.RIGHT:
            moveRight(snake);
            break;
        case DIRECTION.DOWN:
            moveDown(snake);
            break;
        case DIRECTION.UP:
            moveUp(snake);
            break;
    }
    moveBody(snake);
    checkCollision();

    if (life > 0) {
        setTimeout(function() {
            move(snake);
        }, move_interval);
    } else {
        life = 3;
        initGame();
    }
}
// menambah badan
function moveBody(snake) {
    snake.body.unshift({ x: snake.head.x, y: snake.head.y });
    snake.body.pop();
}
// mengatur navigasi ular
function turn(snake, direction) {
    const oppositeDirections = {
        [DIRECTION.LEFT]: DIRECTION.RIGHT,
        [DIRECTION.RIGHT]: DIRECTION.LEFT,
        [DIRECTION.DOWN]: DIRECTION.UP,
        [DIRECTION.UP]: DIRECTION.DOWN,
    }

    if (direction !== oppositeDirections[snake.direction]) {
        snake.direction = direction;
    }
}
// mengatur navigasi ular
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft") {
        turn(snake, DIRECTION.LEFT);
    } else if (event.key === "ArrowRight") {
        turn(snake, DIRECTION.RIGHT);
    } else if (event.key === "ArrowUp") {
        turn(snake, DIRECTION.UP);
    } else if (event.key === "ArrowDown") {
        turn(snake, DIRECTION.DOWN);
    }

})

function initGame() {
    move(snake);
}

initGame();