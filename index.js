const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const gridSize = 20;
let snake = [{x: gridSize * 5, y: gridSize * 5}];
let direction = {x: gridSize, y: 0};
let food = generateFood();
let gameOver = false;

function generateFood() {
    return {
        x: Math.floor(Math.random() * canvas.width / gridSize) * gridSize,
        y: Math.floor(Math.random() * canvas.height / gridSize) * gridSize
    };
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snake.forEach(part => {
        ctx.fillStyle = "lime";
        ctx.fillRect(part.x, part.y, gridSize, gridSize);
    });

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function update() {
    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};

    if (head.x >= canvas.width || head.x < 0 || head.y >= canvas.height || head.y < 0 || collision(head)) {
        gameOver = true;
        alert("Game Over");
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
    } else {
        snake.pop();
    }
}

function collision(head) {
    return snake.some((part, index) => index !== 0 && part.x === head.x && part.y === head.y);
}

function changeDirection(event) {
    const { keyCode } = event;
    if (keyCode === 37 && direction.x === 0) {
        direction = {x: -gridSize, y: 0};
    } else if (keyCode === 38 && direction.y === 0) {
        direction = {x: 0, y: -gridSize};
    } else if (keyCode === 39 && direction.x === 0) {
        direction = {x: gridSize, y: 0};
    } else if (keyCode === 40 && direction.y === 0) {
        direction = {x: 0, y: gridSize};
    }
}

document.addEventListener("keydown", changeDirection);

function gameLoop() {
    if (!gameOver) {
        update();
        draw();
        setTimeout(gameLoop, 100);
    }
}

gameLoop();
