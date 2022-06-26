import { setPixel, clearScreen, defineRGBColor, operateOnColors, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../canvas/nlcanvas.js'
import { CAMERA, LIGHT, SCENE_OBJECTS } from '../nlscene.js';
import { getDotProduct, getRandomColor, Vector3, RaycastHit } from '../elements/utils.js';

export function renderScene(){
    clearScreen();
    renderViewportToCanvas();
}

function renderViewportToCanvas(){
    for(let screenX = -SCREEN_WIDTH/2; screenX<=SCREEN_WIDTH/2; screenX++){
        for(let screenY = -SCREEN_HEIGHT/2; screenY<=SCREEN_HEIGHT/2; screenY++){
            let data = getSceneDataForPixel(screenX,screenY);
            traceRayToPoint(new Vector3(data.x, data.y, data.z));
            //setPixel(screenX,screenY, data.color);
        }
    }
}

function getSceneDataForPixel(x,y) {
    return {
        'x': x * (CAMERA.viewport.width/SCREEN_WIDTH),
        'y': y * (CAMERA.viewport.height/SCREEN_HEIGHT),
        'z': CAMERA.viewport.distance,
        'color': getRandomColor()
    };
}

function traceRayToPoint(point) {

    Object.values(SCENE_OBJECTS).forEach(element => {
        let origin = CAMERA.position;

        let origin2center =  element.position.sub(origin);
        let direction = origin.sub(point);
        let radiousSqrd = Math.pow(element.radious,2);

        let a = point.sub(origin).selfDotProduct();
        let b = 2*origin2center.dotProduct(direction);
        let c = origin2center.selfDotProduct()-radiousSqrd;

        let t1 = (-b + Math.sqrt(Math.pow(b,2)-4*a*c))/(2*a);
        let t2 = (-b - Math.sqrt(Math.pow(b,2)-4*a*c))/(2*a);

        if(t1>1){
            console.log(t1);
        }
        if(t2>1){
            console.log(t2);
        }
    });
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