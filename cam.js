class Camera {
  constructor() {
    this.pos = Vector.create(0, 0);
    this.vel = Vector.create(0, 0);
    
    this.target = Vector.create(0, 0);
    
    this.lerpSpeed = 0.1;
  }
  
  setPos(p) {
    this.pos = Vector.clone(p);
  }
  
  applyForce(f) {
    Vector.add(this.pos, f, this.pos);
  }
  
  setTarget(p) {
    this.target = Vector.clone(p);
  }
}
