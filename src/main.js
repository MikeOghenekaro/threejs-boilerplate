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

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 25000, 300);
scene.add(pointLight);

// Camera positioning
camera.position.set(-90, 140, 140);

const planeGeometry = new THREE.PlaneGeometry(100, 100);
const plainGrayMaterial = new THREE.MeshStandardMaterial({
  color: "gray",
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, plainGrayMaterial);
plane.rotation.x = -0.5 * Math.PI;
scene.add(plane);

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
