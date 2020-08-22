const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasSize = 600;
canvas.width = canvasSize;
canvas.hight = canvasSize;

const snakeBox = 20;
const totalMoves = canvasSize/snakeBox;

const apple = new Image();
apple.src='images/apple.png';

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let down = new Audio();
let left = new Audio();
let right = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
down.src = "audio/down.mp3";
left.src = "audio/left.mp3";
right.src = "audio/right.mp3";

//deffine snake
let snake = [];
snake[0]={
    x : 9 * snakeBox,
    y : 10 * snakeBox
}

//create food
let food = {};
getFood();
//score
let score = 0;

//snake direction
let dir = "";

document.addEventListener("keydown",direction);

function direction(){
    let key = event.keyCode;
    if(key==37 && dir!="RIGHT"){
        dir = "LEFT";
        left.play();
    }
    else if(key==38 && dir!="DOWN"){
        dir = "UP";
        up.play();
    }
    else if(key==39 && dir!="LEFT"){
        dir="RIGHT";
        right.play();
    }
    else if(key==40 && dir!="UP"){
        dir="DOWN";
        down.play();
    }

}

function getFood(){
    food = {
        x : Math.floor( Math.random()*(totalMoves-2-3)+3 ) *snakeBox,
        y : Math.floor( Math.random()*(totalMoves-2-3)+3 )*snakeBox
        
    }
}
function collissionDetection(head,ar){
    for(i=0;i<ar.length;++i){
        if(ar[i].x == head.x && ar[i].y==head.y){
            return true;
        }
    }
    return false;
}

Math.random()*(max-min)+min;

function render(){
    ctx.fillStyle="pink";
    ctx.fillRect(0,0,canvasSize,canvasSize);

    for(let i=0;i<snake.length;++i){
        ctx.fillStyle = i==0?"green": "white";
        ctx.fillRect(snake[1].x,snake[i].y,snakeBox,snakeBox);

        ctx.strokeStyle="red";
        ctx.strokeRect(snake[i].x,snake[i].y,snakeBox,snakeBox);
    }

    ctx.drawImage(apple,food.x,food.y,snakeBox,snakeBox);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(dir=="LEFT") snakeX-=snakeBox;
    if(dir=="RIGHT") snakeX+=snakeBox;
    if(dir=="UP") snakeY-=snakeBox;
    if(dir=="DOWN") snakeY+=snakeBox;

    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        getFood();
    }
    else{
        snake.pop();
    }
    let newHead = {
        x : snakeX,
        y : snakeY
    };

    if(snakeX<0 || snakeX>=canvasSize || snakeY<0 || snakeY>=canvasSize || collissionDetection(newHead,snake)){
        gameOver();
        return;
    }
    snake.unshift(newHead);

    ctx.fillStyle ="black";
    ctx.font = "40px tahoma";
    ctx.fillText(score,10,40);
}


render()
var gm = setInterval(render,100);
function gameOver(){
    clearInterval(gm);
    dead.play();
    ctx.font = "40px tahoma";
    ctx.fillText("GAme Over" , canvasSize/2-200,canvasSize/2);
}




