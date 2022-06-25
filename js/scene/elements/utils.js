export function getRandomId(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

export function getRandomColor(){
    return { 'r' : Math.random() * 255,
             'g' : Math.random() * 255,
             'b' : Math.random() * 255};
}

export function getDotProduct(point, origin){
    return ((point.x-origin.x)*(point.x-origin.x) + 
           (point.y-origin.y)*(point.y-origin.y) + 
           (point.z-origin.z)*(point.z-origin.z))
}