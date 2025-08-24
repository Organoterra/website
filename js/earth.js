import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js';

const canvas = document.getElementById('earth-canvas');

// Scene & Renderer
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 2000);
camera.position.set(0, 0, 6);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 3.5;
controls.maxDistance = 10;

// Lighting
const ambient = new THREE.AmbientLight(0x557799, 0.7);
scene.add(ambient);
const sun = new THREE.DirectionalLight(0xffffff, 1.1);
sun.position.set(-5, 2, 6);
scene.add(sun);

// Textures
const loader = new THREE.TextureLoader();
const tex = {
  diffuse: loader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg'),
  normal:  loader.load('https://threejs.org/examples/textures/planets/earth_normal_2048.jpg'),
  spec:    loader.load('https://threejs.org/examples/textures/planets/earth_specular_2048.jpg'),
  clouds:  loader.load('https://threejs.org/examples/textures/planets/earth_clouds_2048.png')
};
tex.clouds.wrapS = tex.clouds.wrapT = THREE.ClampToEdgeWrapping;
tex.clouds.rotation = 0; // needed to ensure no warning in r160 when mutating props

// Earth
const earthGeo = new THREE.SphereGeometry(2, 64, 64);
const earthMat = new THREE.MeshPhongMaterial({
  map: tex.diffuse,
  normalMap: tex.normal,
  specularMap: tex.spec,
  specular: new THREE.Color(0x333333),
  shininess: 12
});
const earth = new THREE.Mesh(earthGeo, earthMat);
scene.add(earth);

// Clouds (slightly bigger sphere)
const cloudGeo = new THREE.SphereGeometry(2.02, 64, 64);
const cloudMat = new THREE.MeshPhongMaterial({
  map: tex.clouds,
  transparent: true,
  depthWrite: false
});
const clouds = new THREE.Mesh(cloudGeo, cloudMat);
scene.add(clouds);

// Stars backdrop
const stars = (() => {
  const starGeo = new THREE.BufferGeometry();
  const count = 2000;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // random points on a sphere shell
    const r = 600 + Math.random() * 200;
    const theta = Math.acos(2 * Math.random() - 1);
    const phi = 2 * Math.PI * Math.random();
    positions[i*3 + 0] = r * Math.sin(theta) * Math.cos(phi);
    positions[i*3 + 1] = r * Math.sin(theta) * Math.sin(phi);
    positions[i*3 + 2] = r * Math.cos(theta);
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const starMat = new THREE.PointsMaterial({ size: 1.2, sizeAttenuation: true });
  const pts = new THREE.Points(starGeo, starMat);
  return pts;
})();
scene.add(stars);

// Resize handler
function resize() {
  const { clientWidth, clientHeight } = canvas.parentElement; // hero section
  renderer.setSize(clientWidth, clientHeight, false);
  camera.aspect = clientWidth / clientHeight;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize);
resize();

// Animation loop
const clock = new THREE.Clock();
function animate() {
  const t = clock.getElapsedTime();
  earth.rotation.y = t * 0.10; // Earth spin
  clouds.rotation.y = t * 0.15; // Clouds drift a bit faster
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

// Accessibility: reduce motion if user prefers
const media = matchMedia('(prefers-reduced-motion: reduce)');
function handleReducedMotion() {
  if (media.matches) {
    earth.rotation.y = 0.0;
    clouds.rotation.y = 0.0;
  }
}
media.addEventListener?.('change', handleReducedMotion);
handleReducedMotion();

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Simple client-side form handler (no backend yet)
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());

  // Basic validation
  if (!data.name || !data.email || !data.message) {
    statusEl.style.display = 'block';
    statusEl.style.color = '#fca5a5';
    statusEl.textContent = 'Please fill out all fields.';
    return;
  }

  // Store locally as example (replace with real backend)
  const drafts = JSON.parse(localStorage.getItem('contactDrafts') || '[]');
  drafts.push({ ...data, ts: new Date().toISOString() });
  localStorage.setItem('contactDrafts', JSON.stringify(drafts));

  statusEl.style.display = 'block';
  statusEl.style.color = '#a8f0c6';
  statusEl.textContent = 'Thanks! Your message has been staged locally.';
  form.reset();
});
