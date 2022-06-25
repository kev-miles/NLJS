import { getRandomId, getRandomColor, getDotProduct } from "./utils.js";


export function createSphere(center, radious, color) {
    let r = radious;
    let c = center;
    return {
        'id': getRandomId(),
        'position': { 'x': center.x, 'y':center.y, 'z':center.z},
        'radious': radious,
        'color': color === undefined ? getRandomColor() : color,
        'isPointInObject': function(point)
        { console.log("r= "+r+" c="+c); return getDotProduct(point, c) === r*r;}
    }
}