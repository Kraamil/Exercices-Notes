const ZONE = document.getElementById('zone');
const STYLE = document.getElementById('style-snake');

let zoneWidth = 20; 
let zoneHeight = 20;

let snake = {head: {positionX:11, positionY:10}, body:[]};

let DIR = 'RIGHT';
let mov = true;

let pause = true;

let score = 0;

let over = false;

let speed = 300;

function createZone () {
    for (i = 1; i<=zoneWidth; i++) {
        row = document.createElement('tr');
        ZONE.appendChild(row);
        for (j = 1; j<=zoneHeight; j++) {
            cell = document.createElement('td'); 
            if (i%2 == j%2){
                cell.setAttribute("class", "cellEven");
                cell.setAttribute("id", j+"-"+i);
            } else {
                cell.setAttribute("class", "cellOdd");
                cell.setAttribute("id", j+"-"+i);
            }
             row.appendChild(cell);
        }

    }
}

function clear () {
    for (i = 1; i<=zoneWidth; i++) {
        for (j = 1; j<=zoneHeight; j++) {
            if (i%2 == j%2){
                document.getElementById(i+"-"+j).setAttribute("class", "cellEven");
            } else {
                document.getElementById(i+"-"+j).setAttribute("class", "cellOdd");
            }
        }
    }
}

function drawSnake () {
    document.getElementById(snake.head.positionX+"-"+snake.head.positionY).setAttribute("class", "snake");
    snake.body.forEach(body => {
        document.getElementById(body.positionX+"-"+body.positionY).setAttribute("class", "snake");
    })
}

function movement () {
    if (DIR=="UP") {
        snake.head = {positionX : snake.head.positionX, positionY : snake.head.positionY -= 1};
    } else if (DIR=="DOWN") {
        snake.head = {positionX : snake.head.positionX, positionY : snake.head.positionY += 1};
    } else if (DIR=="LEFT") {
        snake.head = {positionX : snake.head.positionX -= 1, positionY : snake.head.positionY};
    } else if (DIR=="RIGHT") {
        snake.head = {positionX : snake.head.positionX += 1, positionY : snake.head.positionY};
    }
}

function getNextCell () {
    if (DIR=="UP") {
        nextCell = {positionX: snake.head.positionX, positionY: snake.head.positionY-1};
    } else if (DIR=="DOWN") {
        nextCell = {positionX: snake.head.positionX, positionY: snake.head.positionY+1};
    } else if (DIR=="LEFT") {
        nextCell = {positionX: snake.head.positionX-1, positionY: snake.head.positionY};
    } else if (DIR=="RIGHT") {
        nextCell = {positionX: snake.head.positionX+1, positionY: snake.head.positionY};
    }
}

let eaten = true;
let posApple = {positionX : Math.floor(Math.random() * zoneHeight)+1, positionY : Math.floor(Math.random() * zoneWidth)+1};
let available = false;

function apple () {
    if (eaten) {
        let posAppleX = Math.floor(Math.random() * zoneHeight)+1;
        let posAppleY = Math.floor(Math.random() * zoneWidth)+1;
        eaten = false;
        posApple = {positionX : posAppleX, positionY : posAppleY};
    }
    for (i = 0; i < snake.body.length; i++) {
        if (snake.body[i].positionX == posApple.positionX && snake.body[i].positionY == posApple.positionY) {
            available = false;
        } else {
            available = true;
        }
    }

    if (snake.head.positionX == posApple.positionX && snake.head.positionY == posApple.positionY) {
        available = false;
    } else {
        available = true;
    }

    if (available) {
        document.getElementById(posApple.positionX+"-"+posApple.positionY).setAttribute("class", "apple");
    }
    
}

let antiEaten = true;
let posAntiApple = {positionX : Math.floor(Math.random() * zoneHeight)+1, positionY : Math.floor(Math.random() * zoneWidth)+1};
let antiAvailable = false;

function antiApple () {
    if (antiEaten) {
        let posAAppleX = Math.floor(Math.random() * zoneHeight)+1;
        let posAAppleY = Math.floor(Math.random() * zoneWidth)+1;
        antiEaten = false;
        posAntiApple = {positionX : posAAppleX, positionY : posAAppleY};
    }
    for (i = 0; i < snake.body.length; i++) {
        if (snake.body[i].positionX == posAntiApple.positionX && snake.body[i].positionY == posAntiApple.positionY) {
            antiAvailable = false;
        } else {
            antiAvailable = true;
        }
    }

    if (snake.head.positionX == posAntiApple.positionX && snake.head.positionY == posAntiApple.positionY) {
        antiAvailable = false;
    } else {
        antiAvailable = true;
    }

    if (antiAvailable) {
        document.getElementById(posAntiApple.positionX+"-"+posAntiApple.positionY).setAttribute("class", "antiApple");
    }
    
}

function scoreUpdate () {
    document.getElementById('score').innerHTML = "Score : "+score;
}

function collision () {
    for (i = 0; i < snake.body.length; i++) {
        if ((snake.head.positionX === snake.body[i].positionX) && (snake.head.positionY === snake.body[i].positionY)){
            over = true;
        }
    }

    if (snake.head.positionY > zoneHeight){
        over = true;
    }

    if (snake.head.positionY < 1) {
        over = true;
    }

    if (snake.head.positionX > zoneWidth){
        over = true;
    }

    if (snake.head.positionX < 1){
        over = true;
    }
}

function gameOver() {
    document.getElementById('score').innerHTML = "Game Over";
}

createZone();
drawSnake();

let again = false;

function game () {
    started = true;
    
    
    if (!pause) {
        getNextCell();
        movement();
        apple();
        antiApple();
        collision();
        if (over || score<0) {
            gameOver();
        } else {
            if (nextCell.positionX==posApple.positionX && nextCell.positionY==posApple.positionY) {
                score++;
                scoreUpdate();

                eaten = true;

                snake.body = [{positionX: snake.head.positionX, positionY: snake.head.positionY}, ...snake.body];
                snake.head = {positionX : posApple.positionX, positionY : posApple.positionY};

                clear();
                drawSnake();
                apple();
                antiApple();

            } else if (nextCell.positionX==posAntiApple.positionX && nextCell.positionY==posAntiApple.positionY) {
                score--;
                scoreUpdate();

                antiEaten = true;

                snake.body.splice(snake.body.length-1, 1);

                clear();
                drawSnake();
                apple();
                antiApple();

            } else {
                let temp = {positionX: snake.head.positionX, positionY: snake.head.positionY};
                snake.head = {positionX : nextCell.positionX, positionY : nextCell.positionY};

                for(let i=snake.body.length - 1;i>=1;i--){
                    snake.body[i] = {positionX: snake.body[i-1].positionX, positionY: snake.body[i-1].positionY};
                }

                snake.body[0] = {positionX: temp.positionX, positionY:temp.positionY};

                clear();
                drawSnake();
                apple();
                antiApple();
            }
            
            clear();
            drawSnake();
            apple();
            antiApple();
        }
    }
    
    
    
    
}

let started = false;

document.addEventListener('keydown', (event) => {
    
    if (event.code=='ArrowUp' || event.code=='KeyW') {
        DIR = "UP";
    } else if (event.code=='ArrowDown' || event.code=='KeyS') {
        DIR = "DOWN";
    } else if (event.code=='ArrowLeft' || event.code=='KeyA') {
        DIR = "LEFT";
    } else if (event.code=='ArrowRight' || event.code=='KeyD') {
        DIR = "RIGHT";
    }
    console.log(event.code, DIR)

    if (pause && event.code=='Space') {
        pause = false;
        document.getElementById("instruction").innerText = "Appuyer sur P pour mettre en pause"
    }
    
    if (!over) {
        if (event.code=='KeyP' && pause == true) {
            pause = false;
            document.getElementById("instruction").innerText = "Appuyer sur P pour mettre en pause"
        } else if (event.code=='KeyP') {
            pause = true;
            document.getElementById("instruction").innerText = "Appuyer sur P pour arreter la pause"
        }
    }

    if (!started && (event.code=='Numpad1' || event.code=='Digit1')) {
        setInterval(game, 100);
        document.getElementById("vitesse").innerText = "Vitesse : 100";
        document.getElementById("choix-vitesse").remove();
    } else if (!started && (event.code=='Numpad2' || event.code=='Digit2')) {
        setInterval(game, 200);
        document.getElementById("vitesse").innerText = "Vitesse : 200";
        document.getElementById("choix-vitesse").remove();
    } else if (!started && (event.code=='Numpad3' || event.code=='Digit3')) {
        setInterval(game, 300);
        document.getElementById("vitesse").innerText = "Vitesse : 300";
        document.getElementById("choix-vitesse").remove();
    } else if (!started && (event.code=='Numpad4' || event.code=='Digit4')) {
        setInterval(game, 400);
        document.getElementById("vitesse").innerText = "Vitesse : 400";
        document.getElementById("choix-vitesse").remove();
    } else if (!started && (event.code=='Numpad5' || event.code=='Digit5')) {
        setInterval(game, 500);
        document.getElementById("vitesse").innerText = "Vitesse : 500";
        document.getElementById("choix-vitesse").remove();
    } 

});