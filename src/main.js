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
// ---------------------------------------------------------------------------------------------------------------------

// load textures--------------------------------------------------------------------------------------------------------
const textures = [];
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

// ---------------------------------------------------------------------------------------------------------------------

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 500, 300);
pointLight.position.set(0, 20, 0)
scene.add(pointLight);

// Camera positioning
camera.position.set(0, 14, 14);

const planeGeometry = new THREE.PlaneGeometry(100, 100);
const plainGrayMaterial = new THREE.MeshStandardMaterial({
  color: "gray",
  side: THREE.DoubleSide,
});
const plainGreenMaterial = new THREE.MeshStandardMaterial({
  color: "green",
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, plainGrayMaterial);
plane.rotation.x = -0.5 * Math.PI;
scene.add(plane);

const boxGeometry = new THREE.BoxGeometry(5, 5, 5);
const box = new THREE.Mesh(boxGeometry, plainGreenMaterial);
plane.rotation.x = -0.5 * Math.PI;
box.position.set(0, 5, 0);
scene.add(box);

// Add Orbit Controls
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.update();

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
