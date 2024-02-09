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

let paddleWidth = 20;
let paddleHeight = 70;

let ballWidth = 20;
let ballX = WIDTH / 2 - ballWidth / 2;
let ballY = HEIGHT / 2 - ballWidth / 2;

let ballSpeedX = 5;
let ballSpeedY = ballSpeedX;

let canBounce = true;

let pOneScore = 0;
let pTwoScore = 0;

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
    rect(10, playerOnePaddleTop, paddleWidth, paddleHeight);
    // 87 is W
    if (keyIsDown(87)) {
        if (playerOnePaddleTop > 0) {
            playerOnePaddleTop -= 8;
        }
    }
    // 83 is S
    else if (keyIsDown(83)) {
        if (playerOnePaddleTop < HEIGHT - 70) {
            playerOnePaddleTop += 8;
        }
    }

    rect(WIDTH - 30, playerTwoPaddleTop, paddleWidth, paddleHeight);
    if (keyIsDown(UP_ARROW)) {
        playerTwoPaddleTop -= 10;
    } else if (keyIsDown(DOWN_ARROW)) {
        playerTwoPaddleTop += 10;
    }

    // Ball
    rect(ballX, ballY, ballWidth, ballWidth);

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY < 0 || ballY > HEIGHT - ballWidth) {
        ballSpeedY *= -1;
    }

    if (ballX < 0) {
        // Player two scores
        pTwoScore++;
        ballX = WIDTH / 2 - ballWidth / 2;
        ballY = HEIGHT / 2 - ballWidth / 2;
        ballSpeedX = 5;
        ballSpeedY = ballSpeedX;
    } else if (ballX > WIDTH) {
        // Player one scores
        pOneScore++;
        ballX = WIDTH / 2 - ballWidth / 2;
        ballY = HEIGHT / 2 - ballWidth / 2;
        ballSpeedX = -5;
        ballSpeedY = ballSpeedX;
    }

    checkBounce(30, playerOnePaddleTop);
    checkBounce(WIDTH - 30, playerTwoPaddleTop);

    // Score
    textSize(32);
    text(pOneScore, WIDTH / 4, 50);
    text(pTwoScore, (WIDTH / 4) * 3, 50);
}

function checkBounce(xBoundary, yBoundary) {
    if (
        ballX < xBoundary &&
        ballX > xBoundary - paddleWidth &&
        // have some tolerance
        ballY > yBoundary - 15 &&
        ballY < yBoundary + paddleHeight &&
        canBounce
    ) {
        ballSpeedX *= -1;
        // speed up the ball
        ballSpeedX *= 1.1;
        ballSpeedY *= 1.1;

        canBounce = false;

        setTimeout(() => {
            canBounce = true;
        }, 500);

        randomBounceX();
    }
}

function randomBounceX() {
    sign = Math.sign(ballSpeedX);
    magnitude = Math.sqrt(ballSpeedX ** 2 + ballSpeedY ** 2);

    // random angle between -PI/2 + 0.5 and PI/2 - 0.5
    random_angle = (Math.random() * Math.PI - Math.PI / 2) * 0.5;

    ballSpeedX = magnitude * Math.cos(random_angle);
    ballSpeedY = magnitude * Math.sin(random_angle);

    ballSpeedX *= sign;
}
