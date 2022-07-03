import * as Color from '../../utilities/nlcolor.js';
import * as Screen from '../../canvas/nlcanvas.js'
import { CAMERA, SCENE_OBJECTS } from '../nlscene.js';
import { Vector3 } from '../../utilities/nlmath.js';

export function renderScene(){
    Screen.clear();
    renderViewportToCanvas();
}

function renderViewportToCanvas(){
    let origin = CAMERA.position;

    for(let screenX = -Screen.WIDTH/2; screenX<=Screen.WIDTH/2; screenX++){
        for(let screenY = -Screen.HEIGHT/2; screenY<=Screen.HEIGHT/2; screenY++){
            let dest = canvasToViewport(screenX,screenY);
            Screen.setPixel(screenX,screenY, traceRayToPoint(origin,dest, 1, Infinity));
        }
    }
}

function canvasToViewport(x,y) {
    return new Vector3(x * (CAMERA.viewport.width/Screen.WIDTH),
                       y * (CAMERA.viewport.height/Screen.HEIGHT),
                            CAMERA.viewport.distance);
}

function traceRayToPoint(origin, dest, min, max){

    let closest_t = Infinity;
    let closest_object = null;

    Object.values(SCENE_OBJECTS).forEach(element => {

        let t1, t2 = intersectObjects(origin, dest, element);

        if(t1 > min && t1 < max && t1 < closest_t){
            closest_t = t1;
            closest_object = element;
        }

        if(t2 > min && t2 < max && t2 < closest_t){
            closest_t = t2;
            closest_object = element;
        }

    });

    /*console.log(closest_object + " ");
    if(closest_object != null)
        console.log(closest_object.color);*/

    return (closest_object == null ? new Color.NLColor(0,0,0) : closest_object.color);
}

function intersectObjects(origin, dest, object) {

    let origin2center = origin.sub(object.position);
    let radiousSqrd = Math.pow(object.radious,2);

    let a = dest.selfDotProduct();
    let b = 2*origin2center.dotProduct(dest);
    let c = origin2center.selfDotProduct()-radiousSqrd;

    let discriminant = b*b-4*a*c;

    if(discriminant < 0){
        return Infinity, Infinity;
    }

    let t1 = (-b + Math.sqrt(discriminant))/(2*a);
    let t2 = (-b - Math.sqrt(discriminant))/(2*a);

    return t1, t2;
}