import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeDScene = ({ variant }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Shader Materials
    const vertexShader = `
      uniform float time;
      uniform vec2 mouse;
      varying vec2 vUv;

      void main() {
        vUv = uv;
        vec3 pos = position;
        float distortionFactor = 1.0;
        // Apply wave effect to grid vertices based on both x and y
        pos.z += sin(pos.x * 10.0 + time + mouse.x * distortionFactor) * 0.05;
        pos.z += cos(pos.y * 10.0 + time + mouse.y * distortionFactor) * 0.05;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec2 vUv;
      void main() {
        vec4 color = vec4(0.0, 0.0, 0.0, 0.0); // Start with transparent black background
        float gridX = step(0.98, fract(vUv.x * 20.0)) + step(0.98, 1.0 - fract(vUv.x * 20.0));
        float gridY = step(0.98, fract(vUv.y * 20.0)) + step(0.98, 1.0 - fract(vUv.y * 20.0));
        float grid = min(gridX + gridY, 1.0);

        if (grid > 0.0) {
          // Multicolored grid lines with full opacity
          if (mod(floor(vUv.x * 20.0), 3.0) == 0.0) {
            color = vec4(1.0, 0.0, 0.0, 1.0); // Red, Opaque
          } else if (mod(floor(vUv.y * 20.0), 3.0) == 1.0) {
            color = vec4(1.0, 1.0, 0.0, 1.0); // Yellow, Opaque
          } else {
            color = vec4(0.0, 1.0, 0.0, 1.0); // Green, Opaque
          }
        }

        gl_FragColor = color; // Output color (background will be transparent if 'grid' is 0)
      }
    `;

    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
    });

    let geometry;
    const sphereGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const cylinderGeometry = new THREE.CylinderGeometry(0.3, 0.3, 2, 16);
    const planeGeometry = new THREE.PlaneGeometry(10, 10, 100, 100);

    let mesh;

    if (variant === 'catalog') {
      geometry = cylinderGeometry;
      mesh = new THREE.Mesh(geometry, shaderMaterial);
      mesh.position.set(0, -1, 0);
      mesh.rotation.x = Math.PI / 2;

      const materialRed = new THREE.MeshStandardMaterial({ color: new THREE.Color('#E03A3E'), roughness: 0.8, metalness: 0.2 });
      const materialYellow = new THREE.MeshStandardMaterial({ color: new THREE.Color('#F7D046'), roughness: 0.8, metalness: 0.2 });
      const materialGreen = new THREE.MeshStandardMaterial({ color: new THREE.Color('#34B44A'), roughness: 0.8, metalness: 0.2 });

      const sphereMaterials = [materialRed, materialYellow, materialGreen];

      for (let i = 0; i < 15; i++) {
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterials[i % 3]);
        sphere.position.set(
          mesh.position.x + Math.random() * 2 - 1,
          mesh.position.y + Math.random() * 2 - 1,
          mesh.position.z + Math.random() * 2 - 1
        );
        mesh.add(sphere);
      }

    } else {
      geometry = planeGeometry;
      mesh = new THREE.Mesh(geometry, shaderMaterial);
      mesh.rotation.x = -Math.PI / 2;
    }

    scene.add(mesh);
    camera.position.z = variant === 'catalog' ? 2 : 5;

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
      shaderMaterial.uniforms.time = { value: clock.getElapsedTime() };
      shaderMaterial.uniforms.mouse = { value: new THREE.Vector2(mouseX, mouseY) };
      renderer.render(scene, camera);
    };
    animate();

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
      if (geometry) geometry.dispose();
      shaderMaterial.dispose();
    };
  }, [variant]);

  return <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />;
};

export default ThreeDScene;
