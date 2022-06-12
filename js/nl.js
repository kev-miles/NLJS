const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

const canvas = document.createElement("canvas");
canvas.setAttribute("width", SCREEN_WIDTH);
canvas.setAttribute("height", SCREEN_HEIGHT);
document.body.appendChild(canvas);

const context = canvas.getContext("2d");

const TICK = 30;

function main(){
    console.log("Main executed");
    clearScreen();
    setPixel(SCREEN_WIDTH/2, SCREEN_HEIGHT/2);
}

function setPixel(x,y){
    context.fillStyle = "yellow";
    context.fillRect(x, y, 1, 1);
}

function clearScreen(){
    context.fillStyle = "magenta";
    context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
}