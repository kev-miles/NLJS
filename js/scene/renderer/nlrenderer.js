import { setPixel, clearScreen, defineRGBColor, operateOnColors, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../canvas/nlcanvas.js'
import { CAMERA, LIGHT, SCENE_OBJECTS } from '../nlscene.js';
import { getDotProduct, getRandomColor, Vector3, RaycastHit } from '../elements/utils.js';

export function renderScene(){
    clearScreen();
    renderViewportToCanvas();
}

function renderViewportToCanvas(){
    let origin = CAMERA.position;

    for(let screenX = -SCREEN_WIDTH/2; screenX<=SCREEN_WIDTH/2; screenX++){
        for(let screenY = -SCREEN_HEIGHT/2; screenY<=SCREEN_HEIGHT/2; screenY++){
            let dest = canvasToViewport(screenX,screenY);
            setPixel(screenX,screenY, traceRayToPoint(origin,dest, 1, Infinity));
        }
    }
}

function canvasToViewport(x,y) {
    return new Vector3(x * (CAMERA.viewport.width/SCREEN_WIDTH),
                       y * (CAMERA.viewport.height/SCREEN_HEIGHT),
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

    return (closest_object == null ? defineRGBColor(0,0,0) : closest_object.color);
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

    console.log("t1, t2: " + t1, t2);

    return t1, t2;
}

function defaultHitResult(){
    return {
        'position': {
            'x': CAMERA.position.x + step * (point.x-CAMERA.position.x),
            'y': CAMERA.position.y + step * (point.y-CAMERA.position.y),
            'z': CAMERA.position.z + step * (point.z-CAMERA.position.z)
        },
        'color': defineRGBColor(0,0,0),
        'hit': false
    }
}