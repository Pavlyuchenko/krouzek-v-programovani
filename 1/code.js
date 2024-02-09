// Úkoly:
// 1. Zvýšení rychlosti míče po každém odražení
// 2. Restart hry po každém bodu
// 3. Skóre
// 4. Náhodný směr míče po každém odražení
// 5. Pohyb myší
// 6. Umělá inteligence pro druhého hráče

let WIDTH = 1000;
let HEIGHT = 600;

let playerOnePaddleTop = 0;
let playerTwoPaddleTop = 0;

let ballWidth = 20;
let ballX = WIDTH / 2 - ballWidth / 2;
let ballY = HEIGHT / 2 - ballWidth / 2;

let ballSpeedX = 5;
let ballSpeedY = ballSpeedX;

function setup() {
    createCanvas(WIDTH, HEIGHT);
}

function draw() {
    frameCount++;

    background(0);

    // Middle line
    for (let i = 0; i < HEIGHT; i += 20) {
        rect(WIDTH / 2 - 2.5, i, 5, 10);
    }

    fill(255);

    // Players
    rect(10, playerOnePaddleTop, 10, 70);
    // 87 is W
    if (keyIsDown(87)) {
        if (playerOnePaddleTop > 0) {
            playerOnePaddleTop -= 10;
        }
    }
    // 83 is S
    else if (keyIsDown(83)) {
        if (playerOnePaddleTop < HEIGHT - 70) {
            playerOnePaddleTop += 10;
        }
    }

    rect(WIDTH - 20, playerTwoPaddleTop, 10, 70);
    if (keyIsDown(UP_ARROW)) {
        playerTwoPaddleTop -= 10;
    } else if (keyIsDown(DOWN_ARROW)) {
        playerTwoPaddleTop += 10;
    }

    // Ball
    rect(ballX, ballY, 20, 20);

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY < 0 || ballY > HEIGHT - ballWidth) {
        ballSpeedY *= -1;
    }

    if (
        ballX < 20 &&
        ballX > 10 &&
        ballY > playerOnePaddleTop &&
        ballY < playerOnePaddleTop + 70
    ) {
        ballSpeedX *= -1;
    } else if (
        ballX > WIDTH - 40 &&
        ballX < WIDTH - 30 &&
        ballY > playerTwoPaddleTop &&
        ballY < playerTwoPaddleTop + 70
    ) {
        ballSpeedX *= -1;
    }
}
