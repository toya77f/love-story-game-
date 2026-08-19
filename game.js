import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";


// ==================================================
// BASIC SETUP
// ==================================================

const game = document.getElementById("game");

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x79a9d1);

scene.fog = new THREE.Fog(
  0x79a9d1,
  35,
  160
);


// ==================================================
// CAMERA
// ==================================================

const camera = new THREE.PerspectiveCamera(
  65,
  window.innerWidth / window.innerHeight,
  0.1,
  400
);

camera.position.set(
  0,
  5,
  12
);


// ==================================================
// RENDERER
// ==================================================

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  powerPreference: "high-performance"
});

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

renderer.setPixelRatio(
  Math.min(window.devicePixelRatio, 2)
);

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
  THREE.PCFSoftShadowMap;

game.appendChild(
  renderer.domElement
);


// ==================================================
// LIGHTING
// ==================================================

const sun = new THREE.DirectionalLight(
  0xffffff,
  3
);

sun.position.set(
  40,
  60,
  30
);

sun.castShadow = true;

sun.shadow.mapSize.width = 2048;
sun.shadow.mapSize.height = 2048;

scene.add(sun);


const ambient =
  new THREE.HemisphereLight(
    0xbad7ff,
    0x252035,
    2
  );

scene.add(ambient);


// ==================================================
// GROUND
// ==================================================

const ground =
  new THREE.Mesh(
    new THREE.PlaneGeometry(
      300,
      300
    ),
    new THREE.MeshStandardMaterial({
      color: 0x507447,
      roughness: 0.9
    })
  );

ground.rotation.x =
  -Math.PI / 2;

ground.receiveShadow = true;

scene.add(ground);


// ==================================================
// ROADS
// ==================================================

function createRoad(
  x,
  z,
  width,
  depth
) {

  const road =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        width,
        0.08,
        depth
      ),
      new THREE.MeshStandardMaterial({
        color: 0x29292e,
        roughness: 0.9
      })
    );

  road.position.set(
    x,
    0.04,
    z
  );

  road.receiveShadow = true;

  scene.add(road);
}


createRoad(
  0,
  0,
  20,
  300
);

createRoad(
  0,
  0,
  300,
  20
);


// ==================================================
// SIDEWALK
// ==================================================

function createSidewalk(
  x,
  z,
  width,
  depth
) {

  const sidewalk =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        width,
        0.12,
        depth
      ),
      new THREE.MeshStandardMaterial({
        color: 0x777777,
        roughness: 0.8
      })
    );

  sidewalk.position.set(
    x,
    0.09,
    z
  );

  scene.add(sidewalk);
}


createSidewalk(
  14,
  0,
  5,
  300
);

createSidewalk(
  -14,
  0,
  5,
  300
);

createSidewalk(
  0,
  14,
  300,
  5
);

createSidewalk(
  0,
  -14,
  300,
  5
);


// ==================================================
// BUILDINGS
// ==================================================

function createBuilding(
  x,
  z,
  width,
  height,
  depth
) {

  const building =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        width,
        height,
        depth
      ),
      new THREE.MeshStandardMaterial({
        color:
          new THREE.Color()
            .setHSL(
              Math.random(),
              0.18,
              0.35
            ),

        roughness: 0.75
      })
    );

  building.position.set(
    x,
    height / 2,
    z
  );

  building.castShadow = true;

  building.receiveShadow = true;

  scene.add(building);


  // Windows

  for (
    let y = 3;
    y < height - 1;
    y += 3
  ) {

    const window =
      new THREE.Mesh(
        new THREE.BoxGeometry(
          0.65,
          0.9,
          0.08
        ),
        new THREE.MeshBasicMaterial({
          color:
            Math.random() > 0.35
              ? 0xffd86b
              : 0x22222b
        })
      );

    window.position.set(
      x + width / 2 + 0.05,
      y,
      z
    );

    scene.add(window);
  }
}


// City

for (
  let x = -90;
  x <= 90;
  x += 20
) {

  for (
    let z = -90;
    z <= 90;
    z += 20
  ) {

    if (
      Math.abs(x) < 25 ||
      Math.abs(z) < 25
    ) {

      continue;
    }

    createBuilding(
      x,
      z,
      12,
      8 + Math.random() * 20,
      12
    );

  }
}


// ==================================================
// HOUSE
// ==================================================

function createHouse() {

  const house =
    new THREE.Group();


  const walls =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        12,
        5,
        10
      ),
      new THREE.MeshStandardMaterial({
        color: 0xf0d4c0
      })
    );

  walls.position.y =
    2.5;

  walls.castShadow = true;

  house.add(walls);


  const roof =
    new THREE.Mesh(
      new THREE.ConeGeometry(
        8.5,
        3,
        4
      ),
      new THREE.MeshStandardMaterial({
        color: 0x8b3e50
      })
    );

  roof.rotation.y =
    Math.PI / 4;

  roof.position.y =
    6.5;

  roof.castShadow = true;

  house.add(roof);


  const door =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        2,
        3,
        0.25
      ),
      new THREE.MeshStandardMaterial({
        color: 0x542f22
      })
    );

  door.position.set(
    0,
    1.5,
    5.1
  );

  house.add(door);


  const sign =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        5,
        0.7,
        0.15
      ),
      new THREE.MeshStandardMaterial({
        color: 0xff77aa
      })
    );

  sign.position.set(
    0,
    4.5,
    5.15
  );

  house.add(sign);


  house.position.set(
    -28,
    0,
    -25
  );

  scene.add(house);
}

createHouse();


// ==================================================
// SCHOOL
// ==================================================

function createSchool() {

  const school =
    new THREE.Group();


  const building =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        22,
        8,
        14
      ),
      new THREE.MeshStandardMaterial({
        color: 0xd6d9df
      })
    );

  building.position.y =
    4;

  building.castShadow = true;

  building.receiveShadow = true;

  school.add(building);


  const roof =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        23,
        0.8,
        15
      ),
      new THREE.MeshStandardMaterial({
        color: 0x33384c
      })
    );

  roof.position.y =
    8.4;

  school.add(roof);


  const sign =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        10,
        1,
        0.3
      ),
      new THREE.MeshStandardMaterial({
        color: 0x4169a1
      })
    );

  sign.position.set(
    0,
    6,
    7.2
  );

  school.add(sign);


  school.position.set(
    30,
    0,
    -30
  );

  scene.add(school);
}

createSchool();


// ==================================================
// PLAYER
// ==================================================

const player =
  new THREE.Group();

scene.add(player);


// Body

const body =
  new THREE.Mesh(
    new THREE.CapsuleGeometry(
      0.55,
      1.15,
      8,
      16
    ),
    new THREE.MeshStandardMaterial({
      color: 0x252535,
      roughness: 0.55
    })
  );

body.position.y =
  1.25;

body.castShadow = true;

player.add(body);


// Head

const head =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      0.48,
      32,
      32
    ),
    new THREE.MeshStandardMaterial({
      color: 0xc98d70,
      roughness: 0.45
    })
  );

head.position.y =
  2.25;

head.castShadow = true;

player.add(head);


// Hair

const hair =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      0.5,
      32,
      20
    ),
    new THREE.MeshStandardMaterial({
      color: 0x241815,
      roughness: 0.8
    })
  );

hair.position.y =
  2.48;

hair.scale.y =
  0.65;

hair.castShadow = true;

player.add(hair);


// Eyes

function createEye(x) {

  const eye =
    new THREE.Mesh(
      new THREE.SphereGeometry(
        0.055,
        12,
        12
      ),
      new THREE.MeshBasicMaterial({
        color: 0x111111
      })
    );

  eye.position.set(
    x,
    2.28,
    -0.43
  );

  player.add(eye);
}

createEye(-0.16);
createEye(0.16);


// Initial position

player.position.set(
  0,
  0,
  10
);


// ==================================================
// NPCs
// ==================================================

function createNPC(
  x,
  z,
  color
) {

  const npc =
    new THREE.Group();


  const npcBody =
    new THREE.Mesh(
      new THREE.CapsuleGeometry(
        0.5,
        1,
        8,
        12
      ),
      new THREE.MeshStandardMaterial({
        color
      })
    );

  npcBody.position.y =
    1.1;

  npcBody.castShadow = true;

  npc.add(npcBody);


  const npcHead =
    new THREE.Mesh(
      new THREE.SphereGeometry(
        0.45,
        24,
        24
      ),
      new THREE.MeshStandardMaterial({
        color: 0xd39a78
      })
    );

  npcHead.position.y =
    2.1;

  npcHead.castShadow = true;

  npc.add(npcHead);


  npc.position.set(
    x,
    0,
    z
  );

  scene.add(npc);

  return npc;
}


const npcs = [

  createNPC(
    5,
    -5,
    0x4267a8
  ),

  createNPC(
    -5,
    -7,
    0xa84672
  ),

  createNPC(
    8,
    -28,
    0x6a8f4e
  ),

  createNPC(
    25,
    -25,
    0xb66b4a
  )

];


// ==================================================
// CARS
// ==================================================

function createCar(
  x,
  z,
  color
) {

  const car =
    new THREE.Group();


  const body =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        2.4,
        0.7,
        4.2
      ),
      new THREE.MeshStandardMaterial({
        color,
        roughness: 0.4
      })
    );

  body.position.y =
    0.7;

  body.castShadow = true;

  car.add(body);


  const cabin =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        1.8,
        0.65,
        1.8
      ),
      new THREE.MeshStandardMaterial({
        color: 0x1b2430,
        roughness: 0.25,
        metalness: 0.2
      })
    );

  cabin.position.y =
    1.2;

  cabin.castShadow = true;

  car.add(cabin);


  const wheelGeometry =
    new THREE.CylinderGeometry(
      0.38,
      0.38,
      0.28,
      20
    );


  const wheelMaterial =
    new THREE.MeshStandardMaterial({
      color: 0x111111
    });


  const wheelPositions = [

    [-1.25, 0.4, -1.35],

    [1.25, 0.4, -1.35],

    [-1.25, 0.4, 1.35],

    [1.25, 0.4, 1.35]

  ];


  wheelPositions.forEach(
    position => {

      const wheel =
        new THREE.Mesh(
          wheelGeometry,
          wheelMaterial
        );

      wheel.rotation.z =
        Math.PI / 2;

      wheel.position.set(
        position[0],
        position[1],
        position[2]
      );

      wheel.castShadow = true;

      car.add(wheel);

    }
  );


  car.position.set(
    x,
    0,
    z
  );

  scene.add(car);

  return car;
}


const cars = [

  createCar(
    6,
    35,
    0xd52f4c
  ),

  createCar(
    -6,
    45,
    0x296bd1
  ),

  createCar(
    40,
    5,
    0xeeeeee
  )

];


// ==================================================
// MOVEMENT
// ==================================================

const input = {

  x: 0,

  y: 0,

  sprint: false

};


let velocityY =
  0;

let grounded =
  true;


function movePlayer(
  delta
) {

  const magnitude =
    Math.sqrt(
      input.x * input.x +
      input.y * input.y
    );


  if (
    magnitude > 0.05
  ) {

    const speed =
      input.sprint
        ? 13
        : 7;


    const dx =
      input.x * speed * delta;

    const dz =
      input.y * speed * delta;


    player.position.x +=
      dx;

    player.position.z +=
      dz;


    player.rotation.y =
      Math.atan2(
        input.x,
        input.y
      );


    // Walking animation

    const time =
      performance.now() * 0.01;

    body.rotation.x =
      Math.sin(time) * 0.04;

  }


  // Gravity

  velocityY -=
    18 * delta;

  player.position.y +=
    velocityY * delta;


  if (
    player.position.y <= 0
  ) {

    player.position.y =
      0;

    velocityY =
      0;

    grounded =
      true;

  }

}


// ==================================================
// JUMP
// ==================================================

function jump() {

  if (!grounded)
    return;

  velocityY =
    8;

  grounded =
    false;
}


// ==================================================
// CAMERA
// ==================================================

function updateCamera() {

  const offset =
    new THREE.Vector3(
      0,
      5,
      9
    );

  offset.applyQuaternion(
    player.quaternion
  );

  const target =
    player.position
      .clone()
      .add(offset);


  camera.position.lerp(
    target,
    0.08
  );


  camera.lookAt(
    player.position.x,
    player.position.y + 1.3,
    player.position.z
  );

}


// ==================================================
// JOYSTICK
// ==================================================

const joystick =
  document.getElementById(
    "joystick"
  );

const stick =
  document.getElementById(
    "joystickStick"
  );


let joystickActive =
  false;

let joystickCenter = {
  x: 0,
  y: 0
};


function joystickStart(
  event
) {

  joystickActive =
    true;

  const rect =
    joystick
      .getBoundingClientRect();


  joystickCenter.x =
    rect.left +
    rect.width / 2;

  joystickCenter.y =
    rect.top +
    rect.height / 2;


  joystickMove(
    event
  );
}


function joystickMove(
  event
) {

  if (
    !joystickActive
  )
    return;


  const touch =
    event.touches
      ? event.touches[0]
      : event;


  let dx =
    touch.clientX -
    joystickCenter.x;

  let dy =
    touch.clientY -
    joystickCenter.y;


  const max =
    48;


  const distance =
    Math.sqrt(
      dx * dx +
      dy * dy
    );


  if (
    distance > max
  ) {

    dx =
      dx / distance * max;

    dy =
      dy / distance * max;

  }


  stick.style.transform =
    `translate(
      calc(-50% + ${dx}px),
      calc(-50% + ${dy}px)
    )`;


  input.x =
    dx / max;

  input.y =
    dy / max;

}


function joystickEnd() {

  joystickActive =
    false;

  input.x =
    0;

  input.y =
    0;


  stick.style.transform =
    "translate(-50%, -50%)";

}


joystick.addEventListener(
  "touchstart",
  joystickStart,
  { passive: true }
);

window.addEventListener(
  "touchmove",
  joystickMove,
  { passive: true }
);

window.addEventListener(
  "touchend",
  joystickEnd
);


// ==================================================
// BUTTONS
// ==================================================

const sprintButton =
  document.getElementById(
    "sprintButton"
  );


sprintButton.addEventListener(
  "touchstart",
  () => {

    input.sprint =
      true;

  },
  { passive: true }
);


sprintButton.addEventListener(
  "touchend",
  () => {

    input.sprint =
      false;

  }
);


document
  .getElementById(
    "jumpButton"
  )
  .addEventListener(
    "click",
    jump
  );


// ==================================================
// KEYBOARD
// ==================================================

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "w" ||
      event.key === "ArrowUp"
    )
      input.y = -1;


    if (
      event.key === "s" ||
      event.key === "ArrowDown"
    )
      input.y = 1;


    if (
      event.key === "a" ||
      event.key === "ArrowLeft"
    )
      input.x = -1;


    if (
      event.key === "d" ||
      event.key === "ArrowRight"
    )
      input.x = 1;


    if (
      event.code === "Space"
    )
      jump();

  }
);


document.addEventListener(
  "keyup",
  event => {

    if (
      event.key === "w" ||
      event.key === "ArrowUp" ||
      event.key === "s" ||
      event.key === "ArrowDown"
    )
      input.y = 0;


    if (
      event.key === "a" ||
      event.key === "ArrowLeft" ||
      event.key === "d" ||
      event.key === "ArrowRight"
    )
      input.x = 0;

  }
);


// ==================================================
// DAY / NIGHT
// ==================================================

let timeOfDay =
  0;


function updateWorld(
  delta
) {

  timeOfDay +=
    delta * 0.015;

  if (
    timeOfDay > 1
  )
    timeOfDay = 0;


  const daylight =
    Math.sin(
      timeOfDay *
      Math.PI * 2
    );


  const brightness =
    0.35 +
    Math.max(
      daylight,
      0
    ) * 0.65;


  sun.intensity =
    0.8 +
    brightness * 2;


  ambient.intensity =
    0.8 +
    brightness;

}


// ==================================================
// CAR NPC MOVEMENT
// ==================================================

let carTimer =
  0;


function updateCars(
  delta
) {

  carTimer +=
    delta;


  cars.forEach(
    (car, index) => {

      if (
        index === 0
      ) {

        car.position.z +=
          delta * 4;

        if (
          car.position.z > 80
        )
          car.position.z =
            -80;

      }


      if (
        index === 1
      ) {

        car.position.z -=
          delta * 3;

        if (
          car.position.z < -80
        )
          car.position.z =
            80;

      }


      if (
        index === 2
      ) {

        car.position.x +=
          delta * 3;

        if (
          car.position.x > 80
        )
          car.position.x =
            -80;

      }

    }
  );

}


// ==================================================
// GAME LOOP
// ==================================================

const clock =
  new THREE.Clock();


function animate() {

  requestAnimationFrame(
    animate
  );


  const delta =
    Math.min(
      clock.getDelta(),
      0.05
    );


  movePlayer(
    delta
  );


  updateCamera();


  updateWorld(
    delta
  );


  updateCars(
    delta
  );


  renderer.render(
    scene,
    camera
  );

}


animate();


// ==================================================
// RESIZE
// ==================================================

window.addEventListener(
  "resize",
  () => {

    camera.aspect =
      window.innerWidth /
      window.innerHeight;

    camera.updateProjectionMatrix();


    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

  }
);
