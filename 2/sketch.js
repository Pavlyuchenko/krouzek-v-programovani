/*
	Rules:
		* Cell with <2 neighbors dies
		* Cell with 2 or 3 neighbors survives
		* Cell with >3 neighbors dies
		* Dead cell with 3 neighbors becomes alive
*/

const WIDTH = 800;
const HEIGHT = 600;

let individualSize = 20;
let board = [];
function createBoard(newBoard) {
    for (let i = 0; i < WIDTH / individualSize; i++) {
        newBoard.push([]);
        for (let j = 0; j < HEIGHT / individualSize; j++) {
            newBoard[i].push(0);
        }
    }
    return newBoard;
}

function setup() {
    createCanvas(WIDTH, HEIGHT);
    frameRate(20);

    board = createBoard(board);

    console.log(board);

    // o o o
    board[2][5] = 1;
    board[2][6] = 1;
    board[2][7] = 1;

    // glider
    board[5][5] = 1;
    board[6][6] = 1;
    board[6][7] = 1;
    board[7][5] = 1;
    board[7][6] = 1;

    //  o
    // o o
    //  o
    board[20][20] = 1;
    board[21][21] = 1;
    board[19][21] = 1;
    board[20][22] = 1;
}

function checkNeighbors() {
    newBoard = createBoard([]);

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            let neighbors = 0;

            if (i != 0 && j != 0) {
                if (board[i - 1][j - 1] == 1) {
                    neighbors++;
                }
            }
            if (i != 0) {
                if (board[i - 1][j] == 1) {
                    neighbors++;
                }
            }
            if (i != 0 && j != board[0].length - 1) {
                if (board[i - 1][j + 1] == 1) {
                    neighbors++;
                }
            }
            if (j != 0) {
                if (board[i][j - 1] == 1) {
                    neighbors++;
                }
            }
            if (j != board[0].length - 1) {
                if (board[i][j + 1] == 1) {
                    neighbors++;
                }
            }
            if (i != board.length - 1 && j != 0) {
                if (board[i + 1][j - 1] == 1) {
                    neighbors++;
                }
            }
            if (i != board.length - 1) {
                if (board[i + 1][j] == 1) {
                    neighbors++;
                }
            }
            if (i != board.length - 1 && j != board[0].length - 1) {
                if (board[i + 1][j + 1] == 1) {
                    neighbors++;
                }
            }

            if (board[i][j] == 1) {
                if (neighbors < 2) {
                    newBoard[i][j] = 0;
                } else if (neighbors > 3) {
                    newBoard[i][j] = 0;
                } else {
                    newBoard[i][j] = 1;
                }
            } else {
                if (neighbors == 3) {
                    newBoard[i][j] = 1;
                }
            }
        }
    }
    board = newBoard;
}

function draw() {
    background(0);

    for (let i = 0; i < WIDTH; i += individualSize) {
        for (let j = 0; j < HEIGHT; j += individualSize) {
            fill(random(50, 255), random(50, 255), random(50, 255));
            if (board[i / individualSize][j / individualSize] != 0) {
                rect(i, j, individualSize, individualSize);
            }
        }
    }

    checkNeighbors();
}
