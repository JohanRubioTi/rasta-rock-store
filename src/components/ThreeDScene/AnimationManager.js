import * as THREE from 'three';
import { Vector3 } from 'three';

/**
 * Animates the 3D scene based on the specified parameters.
 * @param {THREE.WebGLRenderer} renderer - The WebGL renderer.
 * @param {THREE.Scene} scene - The Three.js scene.
 * @param {THREE.Clock} clock - The clock for time-based animations.
 * @param {boolean} loading - Indicates if the scene is in the loading state.
 * @param {string} variant - The scene variant ('kyrie', 'grid', 'original').
 * @param {THREE.Group} cameraGroup - The main group object in the scene.
 * @param {THREE.Camera} camera - The camera object.
 * @param {THREE.Vector3} targetLookAt - The target point for the camera to look at.
 * @param {number} elapsedTime - the elapsed time for the animation.
 * @param {number} [timeScale=0.025] - The time scale for animations.
 */ 


export const animate = (renderer, scene, loading, variant, cameraGroup, camera, targetLookAt, timeScale = 0.05) => {
  const clock = new THREE.Clock();
  const animateFrame = () => {
    requestAnimationFrame(animateFrame);
    const elapsedTime = clock.getElapsedTime();
    
    if (loading) {
      group.rotation.y += 0.01;
    } else if (cameraGroup) {
      if (variant === 'kyrie') {
        cameraGroup.position.y = Math.sin(elapsedTime * timeScale) * 2;
      } else if (variant === 'grid') {
        cameraGroup.position.y = Math.sin(elapsedTime * timeScale) * -2;
      } else if (variant === 'original') {
        const scrollY = window.scrollY;

        // Calculate vertical movement based on scroll position
        const movementRange = 2; // Adjust this value to change the maximum movement range
        const maxScroll = 1000; // Adjust this value to change the maximum scroll range
        const movement = Math.min(scrollY / maxScroll, 1) * movementRange;
        
        cameraGroup.position.y = movement;

        // Optionally, rotate the torus based on scroll position
        const rotationSpeed = 0.001; // Adjust this value to change the rotation speed
        cameraGroup.rotation.y += scrollY * rotationSpeed;
        camera.lookAt(new Vector3(0,cameraGroup.position.y/4,0))
      }
    }

    renderer.render(scene, camera);
  };

  animateFrame();
};
