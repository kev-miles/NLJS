export function getRandomId(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

export function getRandomColor(){
    return { 'r' : Math.random() * 255,
             'g' : Math.random() * 255,
             'b' : Math.random() * 255};
}

export function getDotProduct(vector1, vector2){
    return ((vector1.x-vector2.x)*(vector1.x-vector2.x) + 
           (vector1.y-vector2.y)*(vector1.y-vector2.y) + 
           (vector1.z-vector2.z)*(vector1.z-vector2.z))
}

export class Vector2 {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.z = 0;
    };

    add(otherVector){
        return new Vector2(this.x + otherVector.x, this.y + otherVector.y);
    };
    sub(otherVector){
        return new Vector2(this.x - otherVector.x, this.y - otherVector.y);
    };
    dotProduct(otherVector){
        return ((this.x-otherVector.x)*(this.x-otherVector.x) + 
               (this.y-otherVector.y)*(this.y-otherVector.y));
    }
    selfDotProduct(){
        return this.x * this.x + this.y * this.y;
    }
    multiplyByScalar(number){
        return new Vector2(this.x * number, this.y * number);
    }
}

export class Vector3 extends Vector2 {
    constructor(x, y, z) {
      super(x,y);
      this.z = z;
    };

    add(otherVector){
        let v = super.add(otherVector);
        return new Vector3(v.x, v.y, this.z + otherVector.z);
    };
    sub(otherVector){
        let v = super.sub(otherVector);
        return new Vector3(v.x, v.y, this.z - otherVector.z);
    };
    dotProduct(otherVector){
        return super.dotProduct(otherVector) + 
               (this.z - otherVector.z)*(this.z-otherVector.z);
    }
    selfDotProduct(){
        return super.selfDotProduct() + this.z * this.z;
    }
    crossProduct(otherVector){
        return new Vector3
        (this.y * otherVector.z - this.z * otherVector.y,
         this.x * otherVector.z - this.z * otherVector.x,
         this.x * otherVector.y - this.y * otherVector.x);
    }
    multiplyByScalar(number){
        return new Vector3(this.x * number, this.y * number, this.z * number);
    }
}

export class RaycastHit{
    constructor(position, surfaceColor, hit) {
        this.position = position;
        this.color = surfaceColor;
        this.hit = hit;
      };
}