import * as THREE from 'three';

/**
 * Initializes the background with InstancedMesh.
 * Call this once during scene setup.
 */
export const initBackground = (scene) => {
    // Create a simple geometry for the background elements (e.g., tetrahedrons for a sharp, rock look)
    const geometry = new THREE.TetrahedronGeometry(0.2);
    const material = new THREE.MeshStandardMaterial({
        color: 0xF7D046, // Gold
        roughness: 0.4,
        metalness: 0.8,
    });

    const count = 200;
    const mesh = new THREE.InstancedMesh(geometry, material, count);

    // Randomize positions
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
        dummy.position.set(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 40, // Spread vertically
            (Math.random() - 0.5) * 10 - 5 // Depth
        );
        dummy.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        dummy.scale.setScalar(Math.random() * 0.5 + 0.5);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
    mesh.name = 'backgroundInstancedMesh';
    scene.add(mesh);
    return mesh;
};


/**
 * Updates scene objects for a single animation frame.
 * @param {object} params - The animation parameters.
 * @param {THREE.Group} params.group - The group to animate (Hero object).
 * @param {THREE.Camera} params.camera - The scene camera.
 * @param {string} params.variant - The animation variant.
 * @param {number} params.scrollProgress - The current scroll progress (0-1).
 * @param {number} params.elapsedTime - The total elapsed time.
 * @param {object} params.scene - The entire scene object (needed for background access).
 * @param {object} params.mouse - Mouse coordinates {x, y} normalized (-1 to 1).
 */
export const updateSceneObjects = ({ group, camera, variant, scrollProgress, elapsedTime, scene, mouse }) => {
    if (!group) return;

    // --- Hero Object Animation (Narrative Flow) ---
    // Phase 1: Top (0 - 0.3) -> Floating Hero
    // Phase 2: Middle (0.3 - 0.7) -> Dive / Morph
    // Phase 3: Bottom (0.7 - 1.0) -> Align Frame

    if (variant === 'original') {
        // Base rotation
        group.rotation.y = elapsedTime * 0.1 + scrollProgress * Math.PI * 2;

        if (scrollProgress < 0.3) {
            // Hero Phase
            const t = scrollProgress / 0.3;
            group.position.set(0, 0, 0);
            group.scale.setScalar(1 + Math.sin(elapsedTime) * 0.05); // Breathing
        } else if (scrollProgress < 0.7) {
            // Dive Phase
            // Interpolate between Hero and Align positions
            const t = (scrollProgress - 0.3) / 0.4; // 0 to 1

            // "Dive" effect: Camera moves closer or object moves towards camera
            // Actually, let's move the object wildly or deconstruct
            group.position.z = THREE.MathUtils.lerp(0, 2, t);
            group.rotation.x = t * Math.PI;

        } else {
            // Align Phase
             const t = (scrollProgress - 0.7) / 0.3;
             group.position.z = THREE.MathUtils.lerp(2, 0, t);
             group.position.x = THREE.MathUtils.lerp(0, 3, t); // Move to side
             group.rotation.x = Math.PI; // Settle rotation
        }

        // --- Mouse Interaction (Reactive Cursor) ---
        // Float/Sway based on cursor
        if (mouse) {
            const targetX = mouse.x * 0.5;
            const targetY = mouse.y * 0.5;

            // Smooth lerp
            group.position.x += (targetX - group.position.x) * 0.05;
            group.position.y += (targetY - group.position.y) * 0.05;
        }
    }

    // --- Background Animation (Contextual) ---
    const bgMesh = scene?.getObjectByName('backgroundInstancedMesh');
    if (bgMesh) {
        // Evolve based on scroll
        // e.g., rotate the whole background system
        bgMesh.rotation.y = scrollProgress * Math.PI * 0.5;

        // Subtle float for instances could be done in shader, but here we rotate the whole mesh for performance
        bgMesh.rotation.z = Math.sin(elapsedTime * 0.1) * 0.1;

        // Color shift based on scroll (simulated by lighting or material prop if accessible)
        // Here we rely on the mesh standard material interacting with lights.
    }
};
