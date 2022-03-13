const CELL_SIZE = 20;
const CANVAS_SIZE = 600;
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;

//Karakter ular 1
const kepala1 = new Image();
kepala1.src = "./assets/head1copy.png";
const bodi1 = new Image();
bodi1.src = "./assets/pokemon.png";

//Karakter ular 2
const kepala2 = new Image();
kepala2.src = "./assets/head2copy.png";
const bodi2 = new Image();
bodi2.src = "./assets/pokemon.png";

//Karakter ular 3
const kepala3 = new Image();
kepala3.src = "./assets/head3copy.png";
const bodi3 = new Image();
bodi3.src = "./assets/pokemon.png";

const DIRECTION = {
        LEFT: 0,
        RIGHT: 1,
        UP: 2,
        DOWN: 3,
    }
    // Pengaturan Speed (semakin kecil semakin cepat) ubah dari 150 ke 120
const MOVE_INTERVAL = 120;

let nyawasnake = 3;

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
        nyawasnake: 3,
        score: 0,
    }
}

// deklarasi karakter ular
let snake1 = {
    color: "red",
    ...initHeadAndBody(),
    direction: initDirection(),
    score: 0,
}
let snake2 = {
    color: "yellow",
    ...initHeadAndBody(),
    direction: initDirection(),
    score: 0,
}
let snake3 = {
    color: "blue",
    ...initHeadAndBody(),
    direction: initDirection(),
    score: 0,
}

let nyawa = {
    position: initPosition()
}

// Atur Karakter1
const head1 = new Image();
head1.src = "./assets/head1.png";
const body1 = new Image();
body1.src = "./assets/body1.png";

// Atur Karakter 2
const head2 = new Image();
head2.src = "./assets/head2.png";
const body2 = new Image();
body2.src = "./assets/body2.png";

// Atur Karakter 3
const head3 = new Image();
head3.src = "./assets/head3.png";
const body3 = new Image();
body3.src = "./assets/body3.png";

// deklarasi karakter apel
let apples = [{
        color: "red",
        position: initPosition(),
    },
    {
        color: "green",
        position: initPosition(),
    }
]

function drawCell(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

// nyawa board
function drawNyawa(snake) {
    let NyawaCanvas;
    NyawaCanvas = document.getElementById("nyawaBoard");
    let NyawaCtx = NyawaCanvas.getContext("2d");
    let nyawaX = 10;
    let nyawaY = 5;
    let cell = 15;
    NyawaCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    for (let i = 1; i <= snake.nyawa; i++) {
        var img = document.getElementById("nyawa");
        if (i % 11 == 0) {
            nyawaY += 25;
            nyawaX = 10
        }
        NyawaCtx.drawImage(img, nyawaX, nyawaY, cell, cell);
        nyawaX += 20;
    }
}

// Untuk menampilkan score board
function drawScore(snake) {
    let scoreCanvas;
    if (snake.color == snake1.color) {
        scoreCanvas = document.getElementById("score1Board");
    } else if (snake.color == snake2.color) {
        scoreCanvas = document.getElementById("score2Board");
    } else {
        scoreCanvas = document.getElementById("score3Board");
    }
    let scoreCtx = scoreCanvas.getContext("2d");

    scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    scoreCtx.font = "30px Arial";
    scoreCtx.fillStyle = snake.color
    scoreCtx.fillText(snake.score, 10, scoreCanvas.scrollHeight / 2);
}

function draw() {
    setInterval(function() {
        let snakeCanvas = document.getElementById("snakeBoard");
        let ctx = snakeCanvas.getContext("2d");

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        // karakter ular1
        ctx.drawImage(head1, snake1.head.x * CELL_SIZE, snake1.head.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        for (let i = 1; i < snake1.body.length; i++) {
            ctx.drawImage(body1, snake1.body[i].x * CELL_SIZE, snake1.body[i].y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }

        // karakter ular2
        ctx.drawImage(head2, snake2.head.x * CELL_SIZE, snake2.head.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        for (let i = 1; i < snake2.body.length; i++) {
            ctx.drawImage(body2, snake2.body[i].x * CELL_SIZE, snake2.body[i].y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }

        // karakter ular3
        ctx.drawImage(head3, snake3.head.x * CELL_SIZE, snake3.head.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        for (let i = 1; i < snake3.body.length; i++) {
            ctx.drawImage(body3, snake3.body[i].x * CELL_SIZE, snake3.body[i].y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }

        // karakter 2 apel
        for (let i = 0; i < apples.length; i++) {
            let apple = apples[i];
            var img = document.getElementById("apple");
            ctx.drawImage(img, apple.position.x * CELL_SIZE, apple.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }

        // let prima = 0;
        // for (let k = 1; k <= snake.score; k++) {
        //     if (snake.score % k == 0) {
        //         prima++;
        //     }
        // }
        // if (prima == 2) {
        //     var img = document.getElementById("nyawa");
        //     ctx.drawImage(img, nyawa.position.x * CELL_SIZE, nyawa.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        // }

        drawScore(snake1);
        drawScore(snake2);
        drawScore(snake3);
        // drawNyawa(nyawa);
    }, REDRAW_INTERVAL);
}

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

// apples array
function eat(snake, apples) {
    var audio = new Audio('./assets/makan.mp3')
    for (let i = 0; i < apples.length; i++) {
        let apple = apples[i];
        if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
            audio.play();
            apple.position = initPosition();
            snake.score++;
            snake.body.push({ x: snake.head.x, y: snake.head.y });
        }
    }
}

function moveLeft(snake) {
    snake.head.x--;
    teleport(snake);
    eat(snake, apples);
}

function moveRight(snake) {
    snake.head.x++;
    teleport(snake);
    eat(snake, apples);
}

function moveDown(snake) {
    snake.head.y++;
    teleport(snake);
    eat(snake, apples);
}

function moveUp(snake) {
    snake.head.y--;
    teleport(snake);
    eat(snake, apples);
}
// Karakter tewas
function checkCollision(snakes) {
    let isCollide = false;
    //this
    for (let i = 0; i < snakes.length; i++) {
        for (let j = 0; j < snakes.length; j++) {
            for (let k = 1; k < snakes[j].body.length; k++) {
                if (snakes[i].head.x == snakes[j].body[k].x && snakes[i].head.y == snakes[j].body[k].y) {
                    isCollide = true;
                }
            }
        }
    }
    if (isCollide) {
        // game over audio:
        var audio = new Audio('./assets/game-over.mp3');
        audio.play();

        alert("Game over");
        snake1 = initSnake("red");
        snake2 = initSnake("yellow");
    }
    return isCollide;
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
    // Check collision dengan snake3
    if (!checkCollision([snake1, snake2, snake3])) {
        setTimeout(function() {
            move(snake);
        }, MOVE_INTERVAL);
    } else {
        initGame();
    }
}

function moveBody(snake) {
    snake.body.unshift({ x: snake.head.x, y: snake.head.y });
    snake.body.pop();
}

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

// Mengatur kendali snake1
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft") {
        turn(snake1, DIRECTION.LEFT);
    } else if (event.key === "ArrowRight") {
        turn(snake1, DIRECTION.RIGHT);
    } else if (event.key === "ArrowUp") {
        turn(snake1, DIRECTION.UP);
    } else if (event.key === "ArrowDown") {
        turn(snake1, DIRECTION.DOWN);
    }
    // Mengatur kendali snake2
    if (event.key === "a") {
        turn(snake2, DIRECTION.LEFT);
    } else if (event.key === "d") {
        turn(snake2, DIRECTION.RIGHT);
    } else if (event.key === "w") {
        turn(snake2, DIRECTION.UP);
    } else if (event.key === "s") {
        turn(snake2, DIRECTION.DOWN);
    }
    // Mengatur kendali snake3
    if (event.key === "j") {
        turn(snake3, DIRECTION.LEFT);
    } else if (event.key === "l") {
        turn(snake3, DIRECTION.RIGHT);
    } else if (event.key === "i") {
        turn(snake3, DIRECTION.UP);
    } else if (event.key === "k") {
        turn(snake3, DIRECTION.DOWN);
    }
})

function initGame() {
    move(snake1);
    move(snake2);
    move(snake3);
}

initGame();