import * as Colors from '../utilities/nlcolor.js'

export const WIDTH = 320//window.innerWidth;
export const HEIGHT = 200//window.innerHeight;

const canvas = document.createElement("canvas");
canvas.setAttribute("width", WIDTH);
canvas.setAttribute("height", HEIGHT);
document.body.appendChild(canvas);

const context = canvas.getContext("2d");

const TICK = 30;

export function clear(){
    context.fillStyle = "black";
    context.fillRect(0, 0, WIDTH, HEIGHT);
}

export function setPixel(x, y, rgbColor){
    context.fillStyle = "rgb("+rgbColor.r+","+rgbColor.g+","+rgbColor.b+")";
    context.fillRect(WIDTH/2 + x, HEIGHT/2 - y, 1, 1);
}