class Rectangle {
  constructor(x, y, w, h) {
    this.body = Bodies.rectangle(x, y, w, h, { isStatic: true });
    this.w = w;
    this.h = h;
    Composite.add(engine.world, this.body);
  }
  
  show() {
    fill(127);
    stroke(0);
    strokeWeight(2);
    rectMode(CENTER)
    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    rect(0, 0, this.w, this.h);
    pop();
  }
}

class Flag {
  constructor(x, y) {
    this.body = Bodies.rectangle(x, y, 20, 60, { isStatic: true});
    Composite.add(engine.world, this.body);
  }
  
  show() {
    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    stroke(0);
    strokeWeight(2);
    line(0, -30, 0, 30);
    pop();
  }
  
  showHitbox() {
    fill(0, 255, 0);
    stroke(0);
    strokeWeight(2);
    rectMode(CENTER)
    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    rect(0, 0, 20, 60);
    pop();
  }
}
