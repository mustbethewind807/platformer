class Player {
  constructor(x, y) {
    this.r = 16;
    this.body = Bodies.circle(x, y, this.r, {
      restitution: -0.1,
    });
    this.canJump = true;
    Composite.add(engine.world, this.body);
  }

  groundDetection() {
    // Just for niceness
    let pos = Vector.clone(player.body.position);
    // b loop is for errors and when the player bounces
    for (let b = 0; b < 1; b += 0.25) {
      let testPos = Vector.add(pos, Vector.create(0, b));
      // Main loop
      for (let a = radians(45); a < radians(180); a += radians(22.5)) {
        const p = {
          x: testPos.x + cos(a) * player.r,
          y: testPos.y + sin(a) * player.r,
        };
        // circle(p.x, p.y, 8);
        // If touching ground then jump
        for (let obj of loader) {
          if (Vertices.contains(obj.body.vertices, p)) {
            return true;
          }
        }
      }
    }

    return false;
  }

  applyForce(f) {
    Body.applyForce(this.body, this.body.position, f);
  }

  turn(f) {
    Body.rotate(this.body, f, this.body.position, true);
  }

  handleKeys() {
    if (keyIsDown(LEFT_ARROW)) {
      // left
      if (Body.getAngularVelocity(this.body) > -0.5) {
        // Soft limit
        Body.setAngularVelocity(this.body, this.body.angularVelocity - 0.01);
      }
      // Air control
      if (!this.groundDetection()) {
        this.applyForce(Vector.create(-0.0001, 0));
      }
    }
    if (keyIsDown(RIGHT_ARROW)) {
      // right
      if (Body.getAngularVelocity(this.body) < 0.5) {
        // Soft limit
        Body.setAngularVelocity(this.body, this.body.angularVelocity + 0.01);
      }
      // Air control
      if (!this.groundDetection()) {
        this.applyForce(Vector.create(0.0001, 0));
      }
    }
    if (keyIsDown(UP_ARROW) && this.canJump && this.groundDetection()) {
      // up
      this.applyForce(Vector.create(0, -0.025));
      this.canJump = false;
    }
  }

  show() {
    let pos = this.body.position;
    let angle = this.body.angle;

    fill(255, 0, 0);
    stroke(0);
    strokeWeight(2);
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    circle(0, 0, this.r * 2);
    line(0, 0, 0, this.r);
    pop();
  }
}
