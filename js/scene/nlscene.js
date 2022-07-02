import { renderScene } from './renderer/nlrenderer.js'
import { createSphere } from './elements/geometry.js'
import { getRandomColor, Vector3 } from './elements/utils.js'
import { defineRGBColor } from '../canvas/nlcanvas.js'

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
    addObject(createSphere(new Vector3(0,-1,3),1,defineRGBColor(0,255,255)));
    addObject(createSphere(new Vector3(2,0,4),1,defineRGBColor(255,255,0)));
    addObject(createSphere(new Vector3(-2,0,4),1,defineRGBColor(255,0,255)));
    renderScene();
}

function addObject(object){
    SCENE_OBJECTS[object.id] = object;
}

function removeObject(object){
    let key = object.id;
    delete SCENE_OBJECTS.object.key;
}


