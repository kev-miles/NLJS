const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

const canvas = document.createElement("canvas");
canvas.setAttribute("width", SCREEN_WIDTH);
canvas.setAttribute("height", SCREEN_HEIGHT);
document.body.appendChild(canvas);

const context = canvas.getContext("2d");

const TICK = 30;

const operations = {
    "+": 1,
    "*": 2,
    "-": 3,
    "/": 4
};

function main(){
    clearScreen();
    setPixel(0,0, operateOnColors(defineRGBColor(255,0,0),defineRGBColor(0,255,0),"+"));
}

function clearScreen(){
    context.fillStyle = "magenta";
    context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
}

function setPixel(x, y, rgbColor){
    console.log("rgb("+rgbColor.r+","+rgbColor.g+","+rgbColor.b+")");
    context.fillStyle = "rgb("+rgbColor.r+","+rgbColor.g+","+rgbColor.b+")";
    context.fillRect(SCREEN_WIDTH/2 + x, SCREEN_HEIGHT/2 - y, 10, 10);
}

function defineRGBColor(red , green, blue){
    return { 'r' : (red > 255 ? 255 : red < 0 ? 0 : red),
             'g' : (green > 255 ? 255 : green < 0 ? 0 : green),
             'b' : (blue > 255 ? 255 : blue < 0 ? 0 : blue)};
}

function operateOnColors(rgbColor1, rgbColor2, operation) {

    let normalizedColor1 = normalizeColor(rgbColor1);
    let normalizedColor2 = normalizeColor(rgbColor2);

    switch(operations[operation]) {
        case 1:
            return add(normalizedColor1, normalizedColor2);
        case 2:
            return mul(normalizedColor1, normalizedColor2);
        case 3:
            return sub(normalizedColor1, normalizedColor2);
        case 4:
            return div(normalizedColor1, normalizedColor2);
      }
}

function add(rgbColor1, rgbColor2){
    return defineRGBColor(
        normalizedChannelToByte((rgbColor1.r + rgbColor2.r)), 
        normalizedChannelToByte((rgbColor1.g + rgbColor2.g)), 
        normalizedChannelToByte((rgbColor1.b + rgbColor2.b)));
}
function mul(rgbColor1, rgbColor2){
    return defineRGBColor(
        normalizedChannelToByte((rgbColor1.r * rgbColor2.r)), 
        normalizedChannelToByte((rgbColor1.g * rgbColor2.g)), 
        normalizedChannelToByte((rgbColor1.b * rgbColor2.b)));
}
function sub(rgbColor1, rgbColor2){
    return defineRGBColor(
        normalizedChannelToByte((rgbColor1.r - rgbColor2.r)), 
        normalizedChannelToByte((rgbColor1.g - rgbColor2.g)), 
        normalizedChannelToByte((rgbColor1.b - rgbColor2.b)));
}
function div(rgbColor1, rgbColor2){
    return defineRGBColor(
        normalizedChannelToByte((rgbColor1.r / rgbColor2.r)), 
        normalizedChannelToByte((rgbColor1.g / rgbColor2.g)), 
        normalizedChannelToByte((rgbColor1.b / rgbColor2.b)));
}

function normalizeColor(color){
    return {
        'r' : normalizeChannelValue(color.r),
        'g' : normalizeChannelValue(color.g),
        'b' : normalizeChannelValue(color.b)
    };
}

function normalizedChannelToByte(value){
    return value * 255 / 1;
}

function normalizeChannelValue(value) {
    return value * 1 / 255;
}