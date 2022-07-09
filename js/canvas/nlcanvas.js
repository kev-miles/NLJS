import * as Colors from '../utilities/nlcolor.js'

export const WIDTH = 640 //window.innerWidth;
export const HEIGHT = 480 //window.innerHeight;

const canvas = document.createElement("canvas");
canvas.setAttribute("width", WIDTH);
canvas.setAttribute("height", HEIGHT);
document.body.appendChild(canvas);

const context = canvas.getContext("2d");
let contextBuffer = context.getImageData(0,0, WIDTH, HEIGHT);
let contextPitch = contextBuffer.width * 4;

const TICK = 30;

export function clear(){
    contextBuffer = context.getImageData(0,0, WIDTH, HEIGHT);
}

export function setPixel(x, y, rgbColor){
    x = WIDTH/2 + x;
    y = HEIGHT/2 - y - 1;

    if(x < 0 || y < 0 || y > HEIGHT) return;

    let offset = 4*x + contextPitch*y;
    contextBuffer.data[offset++] = rgbColor.r;
    contextBuffer.data[offset++] = rgbColor.g;
    contextBuffer.data[offset++] = rgbColor.b;
    contextBuffer.data[offset++] = rgbColor.a;
}

export function update(){
    context.putImageData(contextBuffer,0,0);
}