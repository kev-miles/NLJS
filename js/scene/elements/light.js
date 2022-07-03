class Light {

    constructor(position, rotation, color, intensity) {
        this.color = color;
        this.intensity = intensity;
      };
}

export class DirectionalLight extends Light {

    constructor(direction, color, intensity){
        super(color,intensity);
        this.direction = direction;
    };

}

export class PointLight extends Light {

    constructor(position, color, intensity){
        super(color,intensity);
        this.x = position.x;
        this.y = position.y;
        this.z = position.z;
    };
    
}

export class AmbientLight extends Light {

    constructor(intensity, rotation){
        super(intensity,rotation);
    };
    
}
