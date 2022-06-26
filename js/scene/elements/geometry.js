import { getRandomId, getRandomColor, getDotProduct, Vector3 } from "./utils.js";


export function createSphere(center, radious, color) {
    let r = radious;
    let c = center;
    return {
        'id': getRandomId(),
        'position': center,
        'radious': radious,
        'color': color === undefined ? getRandomColor() : color,
        'isPointInObject': function(point)
        { console.log("r= "+r+" c="+c); return getDotProduct(point, c) === r*r;}
    }
}