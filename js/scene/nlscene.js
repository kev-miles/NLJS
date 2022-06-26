import { renderScene } from './renderer/nlrenderer.js'
import { createSphere } from './elements/geometry.js'
import { getRandomColor, Vector3 } from './elements/utils.js'

export let CAMERA = {
    'position': new Vector3(0,0,0),
    'viewport': {'width': 1, 'height': 1, 'distance': 1}
}

export let LIGHT = {
    'position': new Vector3(0,0,0),
    'color': getRandomColor()
}

export let SCENE_OBJECTS = {};

export function update(){
    addObject(createSphere(new Vector3(0,0,0.5),5,getRandomColor()));
    renderScene();
}

function addObject(object){
    SCENE_OBJECTS[object.id] = object;
}

function removeObject(object){
    let key = object.id;
    delete SCENE_OBJECTS.object.key;
}


