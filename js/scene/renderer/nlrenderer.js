import * as Color from '../../utilities/nlcolor.js';
import * as Screen from '../../canvas/nlcanvas.js'
import { getClass } from '../../utilities/nlclass.js';
import { CAMERA, SCENE_OBJECTS, SCENE_LIGHTS } from '../nlscene.js';
import { Vector3 } from '../../utilities/nlmath.js';

export function renderScene(){
    Screen.clear();
    renderViewportToCanvas();
    Screen.update();
}

function renderViewportToCanvas(){
    let origin = CAMERA.position;

    let screenX = Screen.WIDTH/2;
    let screenY = Screen.HEIGHT/2;

    for(let screenX = -Screen.WIDTH/2; screenX<=Screen.WIDTH/2; screenX++){
        for(let screenY = -Screen.HEIGHT/2; screenY<=Screen.HEIGHT/2; screenY++){
            let direction = canvasToViewport(screenX,screenY);
            Screen.setPixel(screenX,screenY, traceRayToPoint(origin,direction, 1, Infinity));
        }
    }

    console.log(performance.now());
}

function canvasToViewport(x,y) {
    return new Vector3(x * (CAMERA.viewport.width/Screen.WIDTH),
                       y * (CAMERA.viewport.height/Screen.HEIGHT),
                            CAMERA.viewport.distance);
}

function traceRayToPoint(origin, direction, min, max){

    let closest_t = Infinity;
    let closest_object = null;

    Object.values(SCENE_OBJECTS).forEach(element => {

        let t1, t2 = intersectObjects(origin, direction, element);

        if(t1 > min && t1 < max && t1 < closest_t){
            closest_t = t1;
            closest_object = element;
        }

        if(t2 > min && t2 < max && t2 < closest_t){
            closest_t = t2;
            closest_object = element;
        }

    });

    return (closest_object == null ? new Color.NLColor(0,0,0) : calculateColor(origin, direction, closest_t, closest_object));
}

function intersectObjects(origin, direction, object) {

    let origin2center = origin.sub(object.position);
    let radiousSqrd = Math.pow(object.radious,2);

    let a = direction.selfDotProduct();
    let b = 2*origin2center.dotProduct(direction);
    let c = origin2center.selfDotProduct()-radiousSqrd;

    let discriminant = b*b-4*a*c;

    if(discriminant < 0){
        return Infinity, Infinity;
    }

    let t1 = (-b + Math.sqrt(discriminant))/(2*a);
    let t2 = (-b - Math.sqrt(discriminant))/(2*a);

    return t1, t2;
}

function calculateColor(origin, direction, closest_t, object){
    let point = origin.add(direction.multiplyByScalar(closest_t));
    let normal = point.sub(object.position);
    let n = new Vector3(normal.x / normal.selfDotProduct(),
                        normal.y / normal.selfDotProduct(),
                        normal.z / normal.selfDotProduct());

    return Color.operateOnColors(object.material.color, computeLighting(point, n, direction.multiplyByScalar(-1), object.material), "*");
}

function computeLighting(point, normal, view, objectMaterial){
    let overall_intensity = 0.0;
    let overall_color = new Color.NLColor(0,0,0);

    Object.values(SCENE_LIGHTS).forEach(light => {
        if(light.intensity > 0){
            overall_intensity += operateOnLightType(point, normal, view, objectMaterial, light);
            overall_color = Color.operateOnColors(overall_color, light.color.multiplyByScalar(overall_intensity), "+");
        }  
    });

    return overall_color;
}

function operateOnLightType(point, normal, view, material, light){
    return (getClass(light) === "AmbientLight" 
        ? light.intensity
        : getClass(light) === "PointLight" 
        ? calculatePointLight(point, normal, view, material, light)
        : calculateDirectionalLight(normal, view, material, light));
}

function calculatePointLight(point, normal, view, material, light){
    let l = light.position.sub(point);
    let ndotl = l.dotProduct(normal);

    return (ndotl > 0
        ? light.intensity * ndotl/(normal.selfDotProduct()*l.selfDotProduct()) 
            + factorInSpecularValue(light.intensity, l, normal, view, material.specular)
        : 0);
}

function calculateDirectionalLight(normal, view, material, light){
    let l = light.direction;
    let ndotl = l.dotProduct(normal);

    return (ndotl > 0
            ? light.intensity * ndotl/(normal.selfDotProduct()*l.selfDotProduct()) 
              + factorInSpecularValue(light.intensity, l, normal, view, material.specular)
            : 0);
}

function factorInSpecularValue(intensity, lightVector, normal, view, specular){
    if(specular === -1) return 0;

    //2*N*dot(N,L)-L
    let reflection = normal.multiplyByScalar(normal.dotProduct(lightVector)*2).sub(lightVector);

    let rdotv = reflection.dotProduct(view);

    return (rdotv > 0 
            ? intensity * Math.pow(rdotv/(reflection.selfDotProduct() * view.selfDotProduct()), specular)
            : 0);
}