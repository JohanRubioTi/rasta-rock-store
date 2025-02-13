import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeDScene = ({ variant }) => { // Accept variant prop
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Rasta Colors
    const rastaRed = new THREE.Color('#E03A3E');
    const rastaYellow = new THREE.Color('#F7D046');
    const rastaGreen = new THREE.Color('#34B44A');

    // Shader Materials for Performance and Animated Effect
    const vertexShader = `
      uniform float time;
      uniform vec2 mouse;
      varying vec2 vUv;

      void main() {
        vUv = uv;
        vec3 pos = position;
        float distortionFactor = 1.0;
        pos.z += sin(pos.x * 8.0 + time + mouse.x * distortionFactor) * 0.05;
        pos.z += cos(pos.y * 8.0 + time + mouse.y * distortionFactor) * 0.05;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec2 vUv;
      void main() {
        vec3 rastaColor = vec3(0.0);
        float bandIndex = floor(vUv.y * 3.0); // 3 bands: 0, 1, 2
        float modulatedY = fract(vUv.y * 3.0); // Fraction within each band

        if (bandIndex == 0.0) {
          rastaColor = vec3(0.878, 0.227, 0.243); // rastaRed
        } else if (bandIndex == 1.0) {
          rastaColor = vec3(0.964, 0.815, 0.274); // rastaYellow
        } else {
          rastaColor = vec3(0.203, 0.705, 0.290); // rastaGreen
        }

        gl_FragColor = vec4(rastaColor, 0.9);
      }
    `;


    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      // wireframe: true, // Keep wireframe for op-art style
    });


    // Geometry - Conditional based on variant prop
    let geometry; // Declare geometry here, before the if/else block
    const sphereGeometry = new THREE.SphereGeometry(0.1, 8, 8); // Smaller spheres
    const cylinderGeometry = new THREE.CylinderGeometry(0.3, 0.3, 2, 16); // Cylinders for catalog
    const planeGeometry = new THREE.PlaneGeometry(10, 10, 200, 200); // Plane for homepage


    let mesh; // Declare mesh outside if block

    if (variant === 'catalog') {
      geometry = cylinderGeometry;
      mesh = new THREE.Mesh(geometry, shaderMaterial);
      mesh.position.set(0, -1, 0); // Adjust cylinder position if needed
      mesh.rotation.x = Math.PI / 2; // Rotate cylinders to stand up

      // Define materials LOCALLY within the 'catalog' variant block
      const materialRed = new THREE.MeshStandardMaterial({ color: rastaRed, roughness: 0.8, metalness: 0.2 });
      const materialYellow = new THREE.MeshStandardMaterial({ color: rastaYellow, roughness: 0.8, metalness: 0.2 });
      const materialGreen = new THREE.MeshStandardMaterial({ color: rastaGreen, roughness: 0.8, metalness: 0.2 });


      // Add spheres around cylinders for complexity
      const sphereMaterials = [materialRed, materialYellow, materialGreen]; // Reuse materials - MATERIALS DEFINED ABOVE NOW!

      for (let i = 0; i < 15; i++) { // More spheres
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterials[i % 3]); // Cycle through colors
        sphere.position.set(
          mesh.position.x + Math.random() * 2 - 1, // Position around cylinder x
          mesh.position.y + Math.random() * 2 - 1, // Position around cylinder y
          mesh.position.z + Math.random() * 2 - 1  // Position around cylinder z
        );
        mesh.add(sphere); // Add spheres as children of the cylinder for easy rotation
      }


    } else {
      geometry = planeGeometry;
      mesh = new THREE.Mesh(geometry, shaderMaterial);
      mesh.rotation.x = -Math.PI / 2; // Lay plane flat for homepage
    }


    scene.add(mesh);


    camera.position.z = variant === 'catalog' ? 2 : 5; // Adjusted camera Z for catalog variant - cylinders closer, EVEN CLOSER

    const clock = new THREE.Clock();
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) - 0.5;
      mouseY = (event.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', onMouseMove);


    const animate = () => {
      requestAnimationFrame(animate);
      shaderMaterial.uniforms.time = { value: clock.getElapsedTime() }; // Correctly update uniforms here!
      shaderMaterial.uniforms.mouse = { value: new THREE.Vector2(mouseX, mouseY) };

      renderer.render(scene, camera);
    };
    animate();


    // Resize handling (adjust camera aspect)
    const handleResize = () => {
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);


    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      if (geometry) { // Check if geometry exists before disposing
        geometry.dispose(); // Dispose of geometry (which could be planeGeometry or cylinderGeometry)
      }
      shaderMaterial.dispose();
    };
  }, [variant]); // variant as dependency for useEffect


  return <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />; // Full page style!
};

export default ThreeDScene;
