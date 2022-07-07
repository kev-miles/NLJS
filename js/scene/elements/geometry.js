import * as Color from '../../utilities/nlcolor.js'
import * as NLMath from '../../utilities/nlmath.js'
import { NLID } from '../../utilities/nlid.js';
import { NLMaterial } from '../../utilities/nlmaterial.js';

export class Sphere {
    constructor(center, radious, material = new NLMaterial(Color.getRandomColor(), 0)){
        this.id = NLID();
        this.position = center;
        this.radious = radious;
        this.material = material;
    }

    isPointInObject(point){
        return point.dotProduct(center) === r*r;
    }
}