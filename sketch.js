const debug = true;
const { Engine, Bodies, Composite, Body, Vector, Vertices, Events } = Matter;
let engine;
let player;
let flag;

let objects = [];

let levels = [
  {
    spawn: Vector.create(320, 180),
    walls: [
      {type: "Rect", x: 320, y: 350, w: 2560, h: 20, options: { isStatic: true}},
      {type: "Rect", x: 320, y: 250, w: 200, h: 20, options: { isStatic: true, angle: 10}},
    ],
    flag: {position: Vector.create(1500, 310), angle: 0},
  },
];

let loader = [];
let currentLevel = 0;

function loadLevel(n) {
  Engine.clear(engine);
  for (let o of loader) {
    o = null;
  }
  
  let current = levels[n];
  
  for (let w of current.walls) {
    if (w.type == "Rect") {
      let loadedObj = new Rectangle(w.x, w.y, w.w, w.h, w.options);
      if (w.options.angle) {
        Body.setAngle(loadedObj.body, radians(w.options.angle));
      }
      
      loader.push(loadedObj);
    }
  }
  
  // Resetting the player's position and stuff
  Body.setAngle(player.body, 0);
  Body.setAngularVelocity(player.body, 0);
  Body.setPosition(player.body, current.spawn);
  Body.setVelocity(player.body, { x: 0, y: 0});
  player.canJump = false;
  
  
  // Reset flag
  Body.setPosition(flag.body, current.flag.position);
  Body.setAngle(flag.body, current.flag.angle);
}

function setup() {
  createCanvas(640, 360);
  engine = Engine.create();
  player = new Player(320, 180);
  flag = new Flag(0, 0);
  
  Events.on(engine, 'collisionStart', function (event) {
    let pairs = event.pairs;
    
    pairs.forEach(function (pair) {
      let bodyA = pair.bodyA;
      let bodyB = pair.bodyB;
      
      if (bodyA == player.body || bodyB == player.body) {
        if (bodyA == flag.body || bodyB == flag.body) {
          // If player touching flag
          currentLevel++;
          loadLevel(currentLevel);
        }
      }
    });
  })
  
  loadLevel(0);
}

function draw() {
  background(255);

  // Check if player can jump
  if (player.groundDetection()) {
    player.canJump = true;
  }

  // Update stuff
  player.handleKeys();

  // Engine updates
  Engine.update(engine);
  if (Body.getAngularSpeed(player.body) < 0.001) {
    Body.setAngularVelocity(player.body, 0);
  }
  if (abs(Body.getVelocity(player.body).x) < 0.001) {
    Body.setVelocity(
      player.body,
      Vector.create(0, Body.getVelocity(player.body).y)
    );
  }
  if (abs(Body.getVelocity(player.body).y) < 0.001) {
    Body.setVelocity(
      player.body,
      Vector.create(Body.getVelocity(player.body).x, 0)
    );
  }

  // Display stuff

  // step 1: translate for camera stuff
  push();
  const pos = player.body.position;
  translate(-pos.x + width / 2, -pos.y + height / 2);

  player.show();
  for (let b of loader) {
    b.show();
  }
  
  flag.showHitbox();
  flag.show();

  pop();

  if (debug) {
    stroke(0);
    strokeWeight(1);
    textSize(16);
    textAlign(LEFT, TOP);
    text(`Angular Velocity: ${Body.getAngularVelocity(player.body)}`, 0, 0);
    text(`pos: ${player.body.position.x}, ${player.body.position.y}`, 0, 16);
    text(`xvel: ${Body.getVelocity(player.body).x}`, 0, 32);
    text(`yvel: ${Body.getVelocity(player.body).y}`, 0, 48);
    text(`grounded: ${player.groundDetection()}`, 0, 64);

    textAlign(RIGHT, TOP);
    text(`FPS: ${floor(frameRate())}`, width, 0);
  }
}
