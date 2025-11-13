import * as THREE from 'three';

/**
 * Updates scene objects for a single animation frame.
 * @param {object} params - The animation parameters.
 * @param {THREE.Group} params.group - The group to animate.
 * @param {THREE.Camera} params.camera - The scene camera.
 * @param {string} params.variant - The animation variant.
 * @param {number} params.scrollProgress - The current scroll progress (0-1).
 * @param {number} params.elapsedTime - The total elapsed time.
 */
export const updateSceneObjects = ({ group, camera, variant, scrollProgress, elapsedTime }) => {
    if (!group) {
        return;
    }

    if (variant === 'kyrie') {
        // Gentle floating animation
        group.position.y = Math.sin(elapsedTime * 0.2) * 0.3;
    } else if (variant === 'original') {
        // Scroll-based animation
        const movementRange = 2;
        group.position.y = scrollProgress * movementRange;

        const rotationFactor = 1.5;
        group.rotation.y = scrollProgress * rotationFactor;

        camera.lookAt(0, group.position.y / 4, 0);
    }
};