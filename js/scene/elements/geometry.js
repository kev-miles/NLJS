import { getRandomId, getRandomColor } from "./utils.js";


export function createSphere(center, radious, color) {
    let r = radious;
    let c = center;
    return {
        'id': getRandomId(),
        'position': { 'x': center.x, 'y':center.y, 'z':center.z},
        'radious': radious,
        'color': color === undefined ? getRandomColor() : color,
        'isPointInObject': function(point){ return (Math.abs((point-c)*(point-c))) === r*r;}
    }
}