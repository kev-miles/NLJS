import * as Color from '../utilities/nlcolor.js'
import * as Geometry from './elements/geometry.js'
import * as Light from './elements/light.js'
import { renderScene } from './renderer/nlrenderer.js'
import { Vector3 } from '../utilities/nlmath.js'

export let CAMERA = {
    'position': new Vector3(0,0,0),
    'viewport': {'width': 1, 'height': 1, 'distance': 1}
}

export let SCENE_OBJECTS = {};
export let SCENE_LIGHTS = {};

export function update(){
    addObject(new Geometry.Sphere(new Vector3(0,-1,3),1, new Color.NLColor(0,255,255)));
    addObject(new Geometry.Sphere(new Vector3(2,0,4),1, new Color.NLColor(255,255,0)));
    addObject(new Geometry.Sphere(new Vector3(-2,0,4),1,new Color.NLColor(255,0,255)));
    addLight(new Light.PointLight(new Vector3(2,1,0), new Color.NLColor(0,255,0), 0.6))
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

