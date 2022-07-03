import * as Color from '../../utilities/nlcolor.js';
import * as Screen from '../../canvas/nlcanvas.js'
import { getClass } from '../../utilities/nlclass.js';
import { CAMERA, SCENE_OBJECTS, SCENE_LIGHTS } from '../nlscene.js';
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

    return (closest_object == null ? new Color.NLColor(0,0,0) : calculateColor(origin, dest, closest_t, closest_object));
}

function calculateColor(origin, dest, closest_t, object){
    let point = origin.add(new Vector3(closest_t * dest.x, closest_t * dest.y, closest_t * dest.z));
    let normal = point.sub(object.position);
    let n = new Vector3(normal.x / normal.selfDotProduct(),
                        normal.y / normal.selfDotProduct(),
                        normal.z / normal.selfDotProduct());

    //TODO: complete lighting calculations
    return object.color;
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

function computeLighting(point, normal){
    let overall_intensity = 0.0;

    Object.values(SCENE_LIGHTS).forEach(light => {
        overall_intensity += operateOnLightType(point, normal, light);
    });
}

function operateOnLightType(point, normal, light){
    return (getClass(light) === "AmbientLight" 
        ? light.intensity
        : getClass(light) === "PointLight" 
        ? calculatePointLight(point, normal, light)
        : calculateDirectionalLight(normal, light));
}

function calculatePointLight(point, normal, light){
    let l = light.position.sub(point);
    let ndotl = l.dotProduct(normal);

    if(ndotl > 0){
        return light.intensity * ndotl/(selfDotProduct(normal)*selfDotProduct(l));
    }
}

function calculateDirectionalLight(normal, light){
    let l = light.direction;
    let ndotl = l.dotProduct(normal);

    if(ndotl > 0){
        return light.intensity * ndotl/(selfDotProduct(normal)*selfDotProduct(l));
    }
}