import * as THREE from 'three';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Create an empty BufferGeometry
const geometry = new THREE.BufferGeometry();

// Define the number of triangles
const triangleCount = 50; // Number of triangles
const positionsArray = new Float32Array(triangleCount * 3 * 3); // Each triangle has 3 vertices, each vertex has x, y, z

// Fill the positionsArray with random values
for (let i = 0; i < triangleCount * 3 * 3; i++) {
    positionsArray[i] = (Math.random() - 0.5) * 4; // Random values between -2 and 2 for a larger spread
}

// Create the attribute and name it 'position'
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
geometry.setAttribute('position', positionsAttribute);

// Create a material
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true // Enable wireframe to show the triangles' edges
});

// Create the mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 5; // Adjust camera position to fit the scene
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Handle resize
window.addEventListener('resize', () => {
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
    // Optional: Add rotation for dynamic visuals
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;

    // Render the scene
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
