import { renderScene } from './renderer/nlrenderer.js'
import { createSphere } from './elements/geometry.js'
import { getRandomColor } from './elements/utils.js'

export let CAMERA = {
    'position': {'x':0, 'y':0, 'z':0},
    'viewport': {'width': 1, 'height': 1, 'distance': 1}
}

export let LIGHT = {
    'position': {'x':0, 'y':0, 'z':0},
    'color': getRandomColor()
}

export let SCENE_OBJECTS = {};

export function update(){
    renderScene();
}

function addObject(object){
    SCENE_OBJECTS[object.id] = object;
}

function removeObject(object){
    let key = object.id;
    delete SCENE_OBJECTS.object.key;
}


