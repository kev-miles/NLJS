import * as Color from '../utilities/nlcolor.js'
import * as Geometry from './elements/geometry.js'
import * as Light from './elements/light.js'
import { NLMaterial } from '../utilities/nlmaterial.js'
import { renderScene } from './renderer/nlrenderer.js'
import { Vector3 } from '../utilities/nlmath.js'

export let CAMERA = {
    'position': new Vector3(0,0,0),
    'viewport': {'width': 1, 'height': 1, 'distance': 1}
}

export let SCENE_OBJECTS = {};
export let SCENE_LIGHTS = {};

export function update(){
    //Scene Background
    addObject(new Geometry.Sphere(new Vector3(0,0,80), 50, new NLMaterial(new Color.NLColor(255,155,0),50)));
    addObject(new Geometry.Sphere(new Vector3(0,-101,0), 100, new NLMaterial(new Color.NLColor(155,155,55),50)));

    //Scene Objects
    addObject(new Geometry.Sphere(new Vector3(0,-1,3),1,new NLMaterial(new Color.NLColor(0,255,255),1000)));
    addObject(new Geometry.Sphere(new Vector3(2,0,4),1, new NLMaterial(new Color.NLColor(255,255,0),50)));
    addObject(new Geometry.Sphere(new Vector3(-2,0,4),1,new NLMaterial(new Color.NLColor(255,0,255),500)));

    //Scene Lights
    addLight(new Light.DirectionalLight(new Vector3(4,4,0), new Color.NLColor(255,0,0), 0.3));
    addLight(new Light.AmbientLight(new Color.NLColor(255,255,255), 0.1));
    addLight(new Light.PointLight(new Vector3(-2,1,0), new Color.NLColor(255,255,255), 0.65))

    renderScene();
}

function addObject(object){
    SCENE_OBJECTS[object.id] = object;
}

function addLight(light){
    SCENE_LIGHTS[light.id] = light;
}

function removeObject(object){
    let key = object.id;
    delete SCENE_OBJECTS.object.key;
}

function removeLight(light){
    let key = light.id;
    delete SCENE_OBJECTS.object.key;
}

