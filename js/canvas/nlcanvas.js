export const SCREEN_WIDTH = 320//window.innerWidth;
export const SCREEN_HEIGHT = 200//window.innerHeight;

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

export function clearScreen(){
    context.fillStyle = "magenta";
    context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
}

export function setPixel(x, y, rgbColor){
    context.fillStyle = "rgb("+rgbColor.r+","+rgbColor.g+","+rgbColor.b+")";
    context.fillRect(SCREEN_WIDTH/2 + x, SCREEN_HEIGHT/2 - y, 1, 1);
}

export function defineRGBColor(red , green, blue){
    return { 'r' : (red > 255 ? 255 : red < 0 ? 0 : red),
             'g' : (green > 255 ? 255 : green < 0 ? 0 : green),
             'b' : (blue > 255 ? 255 : blue < 0 ? 0 : blue)};
}

export function operateOnColors(rgbColor1, rgbColor2, operation) {

    let normalizedColor1 = normalizeColor(rgbColor1);
    let normalizedColor2 = normalizeColor(rgbColor2);

    switch(operations[operation]) {
        case 1:
            return normalizedColorToByte(add(normalizedColor1, normalizedColor2));
        case 2:
            return normalizedColorToByte(mul(normalizedColor1, normalizedColor2));
        case 3:
            return normalizedColorToByte(sub(normalizedColor1, normalizedColor2));
        case 4:
            return normalizedColorToByte(div(normalizedColor1, normalizedColor2));
        default:
            return defineRGBColor(0,0,0);
      }
}

function add(rgbColor1, rgbColor2){
    return {
        'r': (rgbColor1.r + rgbColor2.r),
        'g': (rgbColor1.g + rgbColor2.g),
        'b': (rgbColor1.b + rgbColor2.b)
    }
}
function mul(rgbColor1, rgbColor2){
    return {
        'r': (rgbColor1.r * rgbColor2.r),
        'g': (rgbColor1.g * rgbColor2.g),
        'b': (rgbColor1.b * rgbColor2.b)
    }
}
function sub(rgbColor1, rgbColor2){
    return {
        'r': (rgbColor1.r - rgbColor2.r),
        'g': (rgbColor1.g - rgbColor2.g),
        'b': (rgbColor1.b - rgbColor2.b)
    }
}
function div(rgbColor1, rgbColor2){
    return {
        'r': (rgbColor1.r / rgbColor2.r),
        'g': (rgbColor1.g / rgbColor2.g),
        'b': (rgbColor1.b / rgbColor2.b)
    }
}

function normalizeColor(color){
    return {
        'r' : normalizeChannelValue(color.r),
        'g' : normalizeChannelValue(color.g),
        'b' : normalizeChannelValue(color.b)
    };
}

function normalizedColorToByte(color){
    return {
        'r' : normalizedChannelToByte(color.r),
        'g' : normalizedChannelToByte(color.g),
        'b' : normalizedChannelToByte(color.b)
    };
}

function normalizedChannelToByte(value){
    let checkedValue = value > 1 ? 1 : value < 0 ? 0 : value;
    return checkedValue * 255 / 1;
}

function normalizeChannelValue(value) {
    return value * 1 / 255;
}