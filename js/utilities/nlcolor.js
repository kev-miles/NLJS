const operations = {
    "+": 1,
    "add": 1,

    "*": 2,
    "mul": 2,

    "-": 3,
    "sub": 3,

    "/": 4,
    "div": 4,
};

export class NLColor {
    constructor(red,green,blue, alpha = 255, normalized = false){
        this.r = red < 255 ? red : 255;
        this.g = green < 255 ? green : 255;
        this.b = blue < 255 ? blue : 255;
        this.a = alpha < 255 ? alpha : 255;
        this.normalized = normalized;
    };

    isNormalized(){
        return this.normalized;
    }

    normalize(){
        return new NLColor(normalizeChannelValue(this.r),
                           normalizeChannelValue(this.g),
                           normalizeChannelValue(this.b),
                           normalizeChannelValue(this.a),
                           true)
    }
    
    toByteValue(){
        return new NLColor(normalizedChannelToByte(this.r),
                           normalizedChannelToByte(this.g),
                           normalizedChannelToByte(this.b),
                           normalizedChannelToByte(this.a),
                           false)
    }

    multiplyByScalar(scalarValue){
        return new NLColor(this.r * scalarValue,
                           this.g * scalarValue,
                           this.b * scalarValue,
                           this.a * scalarValue,
                           false)
    }
}

export function getRandomColor(){
    return new NLColor(Math.random() * 255, Math.random() * 255, Math.random() * 255);
}

export function operateOnColors(nlColor1, nlColor2, operation) {

    let normalizedColor1 = nlColor1.normalize();
    let normalizedColor2 = nlColor2.normalize();

    switch(operations[operation]) {
        case 1:
            return add(normalizedColor1, normalizedColor2).toByteValue();
        case 2:
            return mul(normalizedColor1, normalizedColor2).toByteValue();
        case 3:
            return sub(normalizedColor1, normalizedColor2).toByteValue();
        case 4:
            return div(normalizedColor1, normalizedColor2).toByteValue();
        default:
            return new NLColor(0,0,0);
      }
}

function add(rgbColor1, rgbColor2){
    return new NLColor(rgbColor1.r + rgbColor2.r, 
                       rgbColor1.g + rgbColor2.g,
                       rgbColor1.b + rgbColor2.b)
}
function mul(rgbColor1, rgbColor2){
    return new NLColor(rgbColor1.r * rgbColor2.r, 
                       rgbColor1.g * rgbColor2.g,
                       rgbColor1.b * rgbColor2.b)
}
function sub(rgbColor1, rgbColor2){
    return new NLColor(rgbColor1.r - rgbColor2.r, 
                       rgbColor1.g - rgbColor2.g,
                       rgbColor1.b - rgbColor2.b)
}
function div(rgbColor1, rgbColor2){
    return new NLColor(rgbColor1.r / rgbColor2.r, 
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