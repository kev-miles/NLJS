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

let sceneObjects = {};

export function update(){
    renderScene(sceneObjects);
}

function addObject(object){
    sceneObjects[object.id] = object;
}

function removeObject(object){
    let key = object.id;
    delete sceneObjects.object.key;
}


