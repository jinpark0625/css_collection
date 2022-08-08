const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 230;
camera.position.y = 100;

const controls = new THREE.OrbitControls(camera, renderer.domElement);

const group = new THREE.Group();
scene.add(group);

/* Store each particle coordinates & color */
const vertices = [];
const colors = [];
/* The geometry of the points */
const sparklesGeometry = new THREE.BufferGeometry();
/* The material of the points */
const sparklesMaterial = new THREE.PointsMaterial({
  size: 3,
  alphaTest: 0.2,
  map: new THREE.TextureLoader().load(
    "https://assets.codepen.io/127738/dotTexture.png"
  ),
  vertexColors: true, // Let Three.js knows that each point has a different color
});

/* Create a Points object */
const points = new THREE.Points(sparklesGeometry, sparklesMaterial);
/* Add the points into the scene */
group.add(points);

let sampler = null;
let elephant = null;
new THREE.OBJLoader().load(
  "https://assets.codepen.io/127738/Mesh_Elephant.obj",
  (obj) => {
    elephant = obj.children[0];
    elephant.material = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: 0x000000,
      transparent: true,
      opacity: 0.05,
    });
    group.add(obj);

    sampler = new THREE.MeshSurfaceSampler(elephant).build();

    renderer.setAnimationLoop(render);
  },
  (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
  (err) => console.error(err)
);

/* Define the colors we want */
const palette = [
  new THREE.Color("#FAAD80"),
  new THREE.Color("#FF6767"),
  new THREE.Color("#FF3D68"),
  new THREE.Color("#A73489"),
];
/* Vector to sample the new point */
const tempPosition = new THREE.Vector3();

function addPoint() {
  /* Sample a new point */
  sampler.sample(tempPosition);
  /* Push the point coordinates */
  vertices.push(tempPosition.x, tempPosition.y, tempPosition.z);
  /* Update the position attribute with the new coordinates */
  sparklesGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );

  /* Get a random color from the palette */
  const color = palette[Math.floor(Math.random() * palette.length)];
  /* Push the picked color */
  colors.push(color.r, color.g, color.b);
  /* Update the color attribute with the new colors */
  sparklesGeometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(colors, 3)
  );
}

function render(a) {
  group.rotation.y += 0.002;

  /* If there are less than 10,000 points, add a new one*/
  if (vertices.length < 30000) {
    addPoint();
  }

  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
