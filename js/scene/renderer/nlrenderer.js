import { setPixel, clearScreen, defineRGBColor, operateOnColors, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../canvas/nlcanvas.js'
import { CAMERA, LIGHT } from '../nlscene.js';
import { getRandomColor } from '../elements/utils.js';

export function renderScene(sceneObjects){
    clearScreen();
    renderViewportToCanvas();
}

function renderViewportToCanvas(){
    for(let screenX = -SCREEN_WIDTH/2; screenX<=SCREEN_WIDTH/2; screenX++){
        for(let screenY = -SCREEN_HEIGHT/2; screenY<=SCREEN_HEIGHT/2; screenY++){
            let data = getSceneDataForPixel(screenX,screenY);
            setPixel(screenX,screenY, data.color);
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
    let step = 0.001;
    for(let z=0; x<point.x; x+step){
        let position = CAMERA.position.x + step * (point.z-CAMERA.position.z)
        //let hitSomething = check if something was hit
        if(hitSomething){
            return {
                'position': {
                    'x': CAMERA.position.x + step * (point.x-CAMERA.position.x),
                    'y': CAMERA.position.y + step * (point.y-CAMERA.position.y),
                    'z': CAMERA.position.z + step * (point.z-CAMERA.position.z)
                },
                'color': defineRGBColor(0,0,0),
                'hit': false
            };
        }
    }

    return defaultHitResult();
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