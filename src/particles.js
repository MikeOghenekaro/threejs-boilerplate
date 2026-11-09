import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/addons/libs/stats.module.js";
import * as gui from "dat.gui";

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
const planeGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
// const circleGeometry = new THREE.CircleGeometry(5000, 1000);
const plainGrayMaterial = new THREE.MeshStandardMaterial({
  color: "gray",
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, plainGrayMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;
scene.add(plane);

// Add Orbit Controls
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.update();
orbitControls.autoRotate = true;
orbitControls.autoRotateSpeed = 0.2;
orbitControls.enableDamping = true;

const stats = new Stats();
document.body.appendChild(stats.dom);

// Particles
const particleGeometry = new THREE.SphereGeometry(1, 32, 32);
const particleMaterial = new THREE.PointsMaterial({
  size: 0.02,
  sizeAttenuation: true,
});

function animate() {
  orbitControls.update();
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
