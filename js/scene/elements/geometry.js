import * as Color from '../../utilities/nlcolor.js'
import * as NLMath from '../../utilities/nlmath.js'
import { NLID } from '../../utilities/nlid.js';

export class Sphere {
    constructor(center, radious, color = Color.getRandomColor()){
        this.id = NLID();
        this.position = center;
        this.radious = radious;
        this.color = color;
    }

    isPointInObject(point){
        return point.dotProduct(center) === r*r;
    }
}