const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d");

class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}


let speed = 7;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLengt = 0;
let appleX = 5;
let appleY = 5;
let xVelocity = 0;
let yVelocity = 0;
let score = 0;
const appeSound=new Audio("song1.mp3")
const loseSound=new Audio("beep-03.mp3")
 let btn= document.querySelector(".btn")
const drawGame = () => {
    changeSnakePosition();
    let result = isGameOver();
    if (result) {
        return;
    }
    clearScreen();

    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();
    setTimeout(drawGame, 1000 / speed);

}

function isGameOver() {
    let gameOver = false;

    if (headX === -1 || headX >= tileCount || headY === -1 || headY === tileCount) {
        gameOver = true;
    }

    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if (part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }

    if (gameOver) {
        ctx.fillStyle="blueviolet";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";
        loseSound.play();
        ctx.fillText(`Game over`, canvas.width / 6.5, canvas.height / 2);
        ctx.fillText(` Your score ${score}`, canvas.width / 8, canvas.height / 1.5);
        btn.classList.remove("d-none")

    }

    return gameOver;
}



function reload() {
    window.location.reload();
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana ";
    ctx.fillText(`Score ${score}`, canvas.width - 50, 10);
}

const drawSnake = () => {

    ctx.fillStyle = 'green';
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }
    snakeParts.push(new SnakePart(headX, headY))
    if (snakeParts.length > tailLengt) {
        snakeParts.shift();
    }
    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

}


const changeSnakePosition = () => {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
}

function checkAppleCollision() {
    if (appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLengt++;
        score++;
        appeSound.play();
    }
}


document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
    //up

    if (event.keyCode == 38) {
        if (yVelocity == 1) {
            return;
        }
        yVelocity = -1;
        xVelocity = 0;

    }
    //down
    if (event.keyCode == 40) {
        if (yVelocity == -1) {
            return;
        }
        yVelocity = 1;
        xVelocity = 0;

    }
    //left
    if (event.keyCode == 37) {
        if (xVelocity == 1) {
            return;
        }
        yVelocity = 0;
        xVelocity = -1;

    }
    //down
    if (event.keyCode == 39) {
        if (xVelocity == -1) {
            return;
        }
        yVelocity = 0;
        xVelocity = 1;

    }
}

const clearScreen = () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

}


drawGame()