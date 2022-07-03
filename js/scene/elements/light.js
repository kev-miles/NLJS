import { NLID } from "../../utilities/nlid.js";

class Light {

    constructor(color, intensity) {
        this.id = NLID();
        this.color = color;
        this.intensity = intensity;
      };
}

export class DirectionalLight extends Light {

    constructor(direction, color, intensity){
        super(color,intensity);
        this.direction = direction;
        this.type = "directional";
    };

}

export class PointLight extends Light {

    constructor(position, color, intensity){
        super(color,intensity);
        this.x = position.x;
        this.y = position.y;
        this.z = position.z;
        this.type = "point";
    };
    
}

export class AmbientLight extends Light {

    constructor(color,intensity){
        super(color,intensity);
        this.type = "ambient";
    };
    
}
