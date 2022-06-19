import { setPixel, clearScreen, defineRGBColor, operateOnColors, SCREEN_HEIGHT, SCREEN_WIDTH} from '../canvas/nlcanvas.js';

const CAMERA_POSITION = {'x':0, 'y':0, 'z':0};
const CAMERA_ANGLE = 0;
let VIEWPORT_WIDTH = 0;
let VIEWPORT_HEIGHT = 0;
let VIEWPORT_DISTANCE = 0;

export function setupScene(){
    VIEWPORT_WIDTH = VIEWPORT_HEIGHT = VIEWPORT_DISTANCE = 1;
}

export function renderScene(){
    clearScreen();
    pixelToViewport();
}

function pixelToViewport(){
    for(let screenX = 0; screenX<SCREEN_WIDTH; screenX++){
        for(let screenY = 0; screenY<SCREEN_HEIGHT; screenY++){
            let viewportX = screenX * (VIEWPORT_WIDTH/SCREEN_WIDTH);
            let viewportY = screenY * (VIEWPORT_HEIGHT/SCREEN_HEIGHT);
            setPixel(screenX,screenY,defineRGBColor(Math.random() * 255, Math.random() * 255, Math.random() * 255));
        }
    }
}
