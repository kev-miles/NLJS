const operations = {
    "+": 1,
    "*": 2,
    "-": 3,
    "/": 4
};

export class NLColor {
    constructor(red,green,blue,normalized = false){
        this.r = red;
        this.g = green;
        this.b = blue;
        this.normalized = normalized;
    };

    normalizeColor(color){
        return new NLColor(normalizeChannelValue(color.r),
                           normalizeChannelValue(color.g),
                           normalizeChannelValue(color.b),
                           true)
    }
    
    normalizedColorToByte(color){
        return new NLColor(normalizedChannelToByte(color.r),
                           normalizedChannelToByte(color.g),
                           normalizedChannelToByte(color.b))
    }
}

export function getRandomColor(){
    return new Color(Math.random() * 255, Math.random() * 255, Math.random() * 255);
}

export function operateOnColors(nlColor1, nlColor2, operation) {

    let normalizedColor1 = normalizeColor(nlColor1);
    let normalizedColor2 = normalizeColor(nlColor2);

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
            return new Colors.NLColor();
      }
}

function add(rgbColor1, rgbColor2){
    return new Colors.NLColor(rgbColor1.r + rgbColor2.r, 
                              rgbColor1.g + rgbColor2.g,
                              rgbColor1.b + rgbColor2.b)
}
function mul(rgbColor1, rgbColor2){
    return new Colors.NLColor(rgbColor1.r * rgbColor2.r, 
                              rgbColor1.g * rgbColor2.g,
                              rgbColor1.b * rgbColor2.b)
}
function sub(rgbColor1, rgbColor2){
    return new Colors.NLColor(rgbColor1.r - rgbColor2.r, 
                              rgbColor1.g - rgbColor2.g,
                              rgbColor1.b - rgbColor2.b)
}
function div(rgbColor1, rgbColor2){
    return new Colors.NLColor(rgbColor1.r / rgbColor2.r, 
                              rgbColor1.g / rgbColor2.g,
                              rgbColor1.b / rgbColor2.b)
}

function normalizedChannelToByte(value){
    let checkedValue = value > 1 ? 1 : value < 0 ? 0 : value;
    return checkedValue * 255 / 1;
}

function normalizeChannelValue(value) {
    return value * 1 / 255;
}