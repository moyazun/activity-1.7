import * as THREE from 'three';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import gsap from 'gsap';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Debug UI
 */
const gui = new GUI();

// Parameters for debugging
const parameters = {
    color: 0xff0000, // Initial color
    elevation: 0,    // Initial elevation
    visible: true,   // Mesh visibility
    spin: () => {
        gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
    },
};

// Box geometry and material
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: parameters.color });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// GUI controls
gui.add(parameters, 'elevation', -3, 3, 0.1).name('Elevation').onChange(() => {
    mesh.position.y = parameters.elevation;
});
gui.add(parameters, 'visible').name('Visible').onChange(() => {
    mesh.visible = parameters.visible;
});
gui.add(material, 'wireframe').name('Wireframe');
gui.addColor(parameters, 'color').name('Color').onChange(() => {
    material.color.set(parameters.color);
});
gui.add(parameters, 'spin').name('Spin');

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Handle window resize
window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Animation loop
const tick = () => {
    // Update controls
    controls.update();

    // Render scene
    renderer.render(scene, camera);

    // Request next frame
    window.requestAnimationFrame(tick);
};

tick();
