import React, { useEffect, useRef } from 'react';
    import * as THREE from 'three';
    import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

    const ThreeDScene = ({ variant }) => {
      const mountRef = useRef(null);

      useEffect(() => {
        // === Original Scene Setup (Enhanced) ===
        const initOriginalScene = () => {
          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
          const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); // Enable transparency and antialiasing
          renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
          renderer.setClearColor(0x000000, 0); // Set clear color to transparent
          renderer.toneMapping = THREE.ACESFilmicToneMapping; // Use a more cinematic tone mapping
          renderer.toneMappingExposure = 1; // Adjust exposure as needed
          mountRef.current.appendChild(renderer.domElement);

          const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

          const rastaColors = [0x00ff00, 0xffff00, 0xff0000]; // Green, Yellow, Red

          // Load an HDRI environment map
          new RGBELoader()
            .setPath('/textures/') // Path to the textures folder
            .load('studio_small_08_1k.hdr', function (texture) { // Use a suitable HDRI file name
              texture.mapping = THREE.EquirectangularReflectionMapping;
              scene.environment = texture;

              // Create materials with environment mapping
              const materials = rastaColors.map(color => new THREE.MeshStandardMaterial({
                color: color,
                metalness: 0.6, // Make it slightly metallic
                roughness: 0.4, // Adjust roughness
                envMap: texture, // Apply the environment map
                transparent: true,
                opacity: 0.8, // Initial opacity
              }));

              const group = new THREE.Group();
              materials.forEach((material, index) => {
                const mesh = new THREE.Mesh(geometry, material);
                mesh.rotation.x = 0.5 * index;
                mesh.rotation.y = 0.3 * index;
                group.add(mesh);
              });

              scene.add(group);

              // Add subtle lighting
              const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white ambient light
              scene.add(ambientLight);

              const pointLight1 = new THREE.PointLight(0xffffff, 0.8); // Point light
              pointLight1.position.set(5, 10, 15);
              scene.add(pointLight1);

              const pointLight2 = new THREE.PointLight(0xffffff, 0.5); // Another point light
              pointLight2.position.set(-5, -10, -15);
              scene.add(pointLight2);

              camera.position.z = 30;

              const clock = new THREE.Clock();
              let mouseX = 0;
              let mouseY = 0;
              const targetLookAt = new THREE.Vector3(0, 0, 0); // Center of the scene
              const damping = 0.025; // Adjust for smoother camera movement (reduced damping)

              const onMouseMove = (event) => {
                mouseX = (event.clientX / window.innerWidth) - 0.5;
                mouseY = (event.clientY / window.innerHeight) - 0.5;
              };

              const onTouchMove = (event) => {
                // Use only the first touch point
                if (event.touches.length > 0) {
                  mouseX = (event.touches[0].clientX / window.innerWidth) - 0.5;
                  mouseY = (event.touches[0].clientY / window.innerHeight) - 0.5;
                }
              };

              const onWheel = (event) => {
                camera.position.z += event.deltaY * 0.05; // Adjust zoom speed (slower zoom)
                camera.position.z = Math.max(20, Math.min(40, camera.position.z)); // Limit zoom range (refined limits)
              };

              const updateCameraPosition = () => {
                // Calculate camera offset based on mouse/touch position
                const cameraOffset = new THREE.Vector3(
                  mouseX * 8, // Scale the horizontal movement (reduced scale)
                  0,         // No vertical movement
                  mouseY * 8  // Scale the depth movement (reduced scale)
                );

                // Add the offset to the target look-at position
                targetLookAt.copy(new THREE.Vector3(0, 0, 0).add(cameraOffset));
              };

              window.addEventListener('mousemove', onMouseMove);
              window.addEventListener('touchmove', onTouchMove);
              window.addEventListener('wheel', onWheel); // Add mouse wheel event listener

              const animate = () => {
                requestAnimationFrame(animate);

                const delta = clock.getDelta();

                // Rotate each torus individually (slower rotation)
                group.children.forEach((mesh, index) => {
                  mesh.rotation.x += 0.2 * delta;
                  mesh.rotation.y += 0.1 * delta;

                  // Dynamic opacity
                  const time = clock.elapsedTime + index * 10; // Offset time for each torus
                  mesh.material.opacity = 0.8 + Math.sin(time) * 0.1; // Pulsate opacity between 0.7 and 0.9
                });

                // Smoothly interpolate the camera's lookAt position
                camera.lookAt(camera.position.clone().lerp(targetLookAt, damping));

                // Update camera position based on mouse/touch input
                updateCameraPosition();

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
                window.removeEventListener('touchmove', onTouchMove);
                window.removeEventListener('wheel', onWheel);
                window.removeEventListener('resize', handleResize);
                if (mountRef.current) {
                  mountRef.current.removeChild(renderer.domElement);
                }
                renderer.dispose();
                materials.forEach(material => material.dispose());
                geometry.dispose();
                texture.dispose();
              };
            });
        };

        // === Grid Scene Setup (Product Catalog) === (No changes here)
        const initGridScene = () => {
          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
          const renderer = new THREE.WebGLRenderer({ alpha: true });
          renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
          renderer.setClearColor(0x000000, 0);
          mountRef.current.appendChild(renderer.domElement);

          const gridSize = 10; // Number of cubes in each dimension
          const cubeSize = 1;
          const spacing = 1.2; // Spacing between cubes

          // Shader Materials
          const vertexShader = `
            varying vec3 vPosition;
            void main() {
              vPosition = position;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `;

          const fragmentShader = `
            uniform float time;
            varying vec3 vPosition;

            void main() {
              vec3 color = vec3(0.0);
              float pulse = sin(time + vPosition.x * 0.5 + vPosition.y * 0.5 + vPosition.z * 0.5) * 0.2 + 0.8; // Pulsation effect

              // Assign Rasta colors based on position
              if (int(mod(vPosition.x + vPosition.y + vPosition.z, 3.0)) == 0) {
                color = vec3(1.0, 0.0, 0.0); // Red
              } else if (int(mod(vPosition.x + vPosition.y + vPosition.z, 3.0)) == 1) {
                color = vec3(1.0, 1.0, 0.0); // Yellow
              } else {
                color = vec3(0.0, 1.0, 0.0); // Green
              }

              gl_FragColor = vec4(color * pulse, 0.2); // Apply pulsation and transparency
            }
          `;

          const shaderMaterial = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            transparent: true,
            uniforms: {
              time: { value: 0 },
            },
          });

          const group = new THREE.Group(); // Group to hold all cubes

          for (let x = 0; x < gridSize; x++) {
            for (let y = 0; y < gridSize; y++) {
              for (let z = 0; z < gridSize; z++) {
                const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
                const mesh = new THREE.Mesh(geometry, shaderMaterial);
                mesh.position.set(
                  (x - gridSize / 2) * spacing,
                  (y - gridSize / 2) * spacing,
                  (z - gridSize / 2) * spacing
                );
                group.add(mesh);
              }
            }
          }

          scene.add(group);

          camera.position.set(15, 10, 20); // Initial camera position
          camera.lookAt(0, 0, 0);

          const clock = new THREE.Clock();
          let mouseX = 0;
          let mouseY = 0;
          let touchX = 0;
          let touchY = 0;
          const targetLookAt = new THREE.Vector3(0, 0, 0);
          const damping = 0.025;

          const onMouseMove = (event) => {
            mouseX = (event.clientX / window.innerWidth) - 0.5;
            mouseY = (event.clientY / window.innerHeight) - 0.5;
          };

          const onTouchMove = (event) => {
            touchX = (event.touches[0].clientX / window.innerWidth) - 0.5;
            touchY = (event.touches[0].clientY / window.innerHeight) - 0.5;
          };

          const onWheel = (event) => {
            camera.position.z += event.deltaY * 0.05; // Control zoom speed - Increased for more noticeable zoom
            camera.position.z = Math.max(10, Math.min(30, camera.position.z)); // Limit zoom range - Adjusted for new camera position
          };

          const updateCameraPosition = () => {
            const cameraOffset = new THREE.Vector3(
              mouseX * 5,
              0,
              mouseY * 5
            );
            targetLookAt.copy(new THREE.Vector3(0, 0, 0).add(cameraOffset));
          };

          window.addEventListener('mousemove', onMouseMove);
          window.addEventListener('touchmove', onTouchMove);
          window.addEventListener('wheel', onWheel);

          const animate = () => {
            requestAnimationFrame(animate);

            // Update shader uniform for pulsation
            shaderMaterial.uniforms.time.value = clock.getElapsedTime();

            // Rotate the entire grid slowly
            group.rotation.y = clock.getElapsedTime() * 0.05;

            camera.lookAt(camera.position.clone().lerp(targetLookAt, damping));
            updateCameraPosition();
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
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('resize', handleResize);
            if (mountRef.current) {
              mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
            shaderMaterial.dispose();
            // Dispose of each geometry in the group
            group.children.forEach(child => {
              if (child.geometry) child.geometry.dispose();
            });

          };
        };
        // Initialize based on variant
        let cleanupFunc;
        if (variant === 'original') {
          cleanupFunc = initOriginalScene();
        } else { // Default to grid
          cleanupFunc = initGridScene();
        }

        return () => {
          if (cleanupFunc) {
            cleanupFunc();
          }
        };
      }, [variant]);

      return <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />;
    };

    export default ThreeDScene;
