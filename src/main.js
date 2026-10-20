import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/addons/libs/stats.module.js";

// Scene, camera, render------------------------------------------------------------------------------------------------

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
// ---------------------------------------------------------------------------------------------------------------------

// load textures--------------------------------------------------------------------------------------------------------
const textures = [];
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

// ---------------------------------------------------------------------------------------------------------------------
// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 500, 300);
pointLight.position.set(0, 20, 0);
pointLight.castShadow = true;
scene.add(pointLight);

// Camera positioning
camera.position.set(0, 14, 14);
// ----------------------------------

// Scene background
const skybox = textureLoader.load("/sky_67/sky_67_2k.png", (skyTexture) => {
  skyTexture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = skyTexture;
});

// Add a scene floor
const planeGeometry = new THREE.PlaneGeometry(100, 100, 10, 10);
// const circleGeometry = new THREE.CircleGeometry(5000, 1000);
const plainGrayMaterial = new THREE.MeshStandardMaterial({
  color: "gray",
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, plainGrayMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;
scene.add(plane);

// green standardmaterial
const plainGreenMaterial = new THREE.MeshStandardMaterial({
  color: "green",
  side: THREE.DoubleSide,
});

// box mesh
const boxGeometry = new THREE.BoxGeometry(5, 5, 5, 2, 2, 2);
const box = new THREE.Mesh(boxGeometry, plainGreenMaterial);
plane.rotation.x = -0.5 * Math.PI;
box.position.set(0, 15, 0);
// scene.add(box);

// Visible geometry for box
const boxFrameGeometry = new THREE.WireframeGeometry(boxGeometry);
const redLineMaterial = new THREE.LineBasicMaterial({
  color: "red",
  linewidth: 1,
});

// add vivible geometry segments to box
function addLineSegments(geometry) {
  const segmentMaterial = new THREE.LineBasicMaterial({
    color: "yellow",
    linewidth: 1,
  });
  return new THREE.LineSegments(geometry, segmentMaterial);
}
const boxFrames = addLineSegments(boxFrameGeometry);
// box.add(boxFrames);

// player object (capsule)
const capsuleGeometry = new THREE.CapsuleGeometry(1, 4, 18, 18);
const capsule = new THREE.Mesh(capsuleGeometry, plainGreenMaterial);
capsule.position.set(0, 3, 4);
capsule.castShadow = true;
scene.add(capsule);

// Add Orbit Controls
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.update();

camera;

const stats = new Stats();
document.body.appendChild(stats.dom);

function animate() {
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// capsule controls
document.getElementById("backward").addEventListener("click", function () {
  capsule.position.z += 0.5;
});

document.getElementById("forward").addEventListener("click", function () {
  capsule.position.z -= 0.5;
});

document.getElementById("left").addEventListener("click", function () {
  capsule.position.x -= 0.5;
});

document.getElementById("right").addEventListener("click", function () {
  capsule.position.x += 0.5;
});
