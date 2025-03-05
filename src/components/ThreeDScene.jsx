import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

const ThreeDScene = ({ variant }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    console.log(`ThreeDScene rendering with variant: ${variant}`);
    let scene, camera, renderer, group, textMesh, clock;
    let materials = [];
    let loadedTexture = null; // Store loaded texture
    let loadedFont = null; // Store loaded font
    let shaderMaterial;
    const rastaColors = [0x00ff00, 0xffff00, 0xff0000];

    const initScene = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        variant === 'original' ? 50 : 75,
        window.innerWidth / (window.innerHeight - (variant === 'original' ? 100 : 0)),
        0.1,
        1000
      );
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;

      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement);
      }

      clock = new THREE.Clock();

      // Load resources asynchronously
      const fontLoader = new FontLoader();
      fontLoader.load('public/Great Vibes_Regular.json', (font) => {
        loadedFont = font;
        if (variant === 'original') createText(); // Create text if original variant
      });

      new RGBELoader()
        .setPath('/textures/')
        .load('studio_small_08_1k.hdr', (texture) => {
          loadedTexture = texture;
          loadedTexture.mapping = THREE.EquirectangularReflectionMapping;
          if (variant === 'original') createTorus(); // Create torus if original variant
        });

      if (variant === 'original') {
        // Lighting for original scene
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0xffffff, 0.8);
        pointLight1.position.set(5, 10, 15);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xffffff, 0.5);
        pointLight2.position.set(-5, -10, -15);
        scene.add(pointLight2);

        camera.position.z = 30;
      } else if (variant === 'grid') {
        createGrid();
        camera.position.set(15, 10, 25); // Adjusted camera position
        camera.fov = 75; // Decreased FOV for larger initial size
        camera.updateProjectionMatrix();
        camera.lookAt(0, 0, 0);
      }
    };

    const createText = () => {
      if (!loadedFont || !scene) return; // Ensure font and scene are ready

      const textGeometry = new TextGeometry('Rasta Rock', {
        font: loadedFont,
        size: 10,
        height: 2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.5,
        bevelSize: 0.3,
        bevelOffset: 0,
        bevelSegments: 5,
      });

      textGeometry.center();
      const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
      textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.y = 2; // Adjust text position
      textMesh.position.z = 5;
      scene.add(textMesh);
    };

    const createTorus = () => {
      if (!loadedTexture || !scene) return;

      const geometry = new THREE.TorusGeometry(5, 1.5, 16, 100);
      materials = rastaColors.map(
        (color) =>
          new THREE.MeshStandardMaterial({
            color: color,
            metalness: 0.6,
            roughness: 0.4,
            envMap: loadedTexture, // Use loaded texture
            transparent: true,
            opacity: 0.8,
          })
      );

      group = new THREE.Group();
      materials.forEach((material, index) => {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = 0.5 * index;
        mesh.rotation.y = 0.3 * index;
        group.add(mesh);
      });

      group.position.y = -2; // Adjust torus group position
      scene.environment = loadedTexture;
      scene.add(group);
    };

    const createGrid = () => {
      // Grid creation remains the same
      const gridSize = 10;
      const cubeSize = 1;
      const spacing = 1.2;

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
          float pulse = sin(time + vPosition.x * 0.5 + vPosition.y * 0.5 + vPosition.z * 0.5) * 0.2 + 0.8;

          if (int(mod(vPosition.x + vPosition.y + vPosition.z, 3.0)) == 0) {
            color = vec3(1.0, 0.0, 0.0); // Red
          } else if (int(mod(vPosition.x + vPosition.y + vPosition.z, 3.0)) == 1) {
            color = vec3(1.0, 1.0, 0.0); // Yellow
          } else {
            color = vec3(0.0, 1.0, 0.0); // Green
          }

          gl_FragColor = vec4(color * pulse, 0.2);
        }
      `;

      shaderMaterial = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: true,
        uniforms: {
          time: { value: 0 },
        },
      });

      group = new THREE.Group();

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
    };

    let mouseX = 0;
    let mouseY = 0;
    let touchX = 0;
    let touchY = 0;
    let initialPinchDistance = null; // For pinch zoom
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const targetLookAt = new THREE.Vector3(0, 0, 0);
    const damping = 0.025;

    const onMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) - 0.5;
      mouseY = (event.clientY / window.innerHeight) - 0.5;
    };

    const onTouchStart = (event) => {
      if (event.touches.length === 2 && variant === 'grid') {
        initialPinchDistance = getPinchDistance(event.touches);
      }
    };

    const onTouchMove = (event) => {
      if (event.touches.length === 2 && variant === 'grid') {
        event.preventDefault(); // Prevent page scroll
        const currentPinchDistance = getPinchDistance(event.touches);
        const pinchRatio = currentPinchDistance / initialPinchDistance;
        let targetFOV = camera.fov / pinchRatio;
        targetFOV = Math.max(40, Math.min(100, targetFOV)); // Clamp FOV
        camera.fov = targetFOV;
        camera.updateProjectionMatrix();
        initialPinchDistance = currentPinchDistance;
      } else if (event.touches.length === 1) {
        touchX = (event.touches[0].clientX / window.innerWidth) - 0.5;
        touchY = (event.touches[0].clientY / window.innerHeight) - 0.5;
      }
    };

    const onTouchEnd = () => {
      initialPinchDistance = null;
    };

    const getPinchDistance = (touches) => {
      const dx = touches[0].pageX - touches[1].pageX;
      const dy = touches[0].pageY - touches[1].pageY;
      return Math.sqrt(dx * dx + dy * dy);
    };


    const onWheel = (event) => {
      if (camera) {
        camera.position.z -= event.deltaY * 0.05;
        camera.position.z = Math.max(10, Math.min(variant === 'original' ? 40 : 30, camera.position.z));
      }
    };

    const onScroll = () => {
      if (variant !== 'original' || !group || !textMesh) return;

      const scrollY = window.scrollY;

      // Fade out text
      const textOpacity = Math.max(1 - scrollY / 200, 0); // Adjust 200 to control fade distance
      textMesh.material.opacity = textOpacity;
      textMesh.material.transparent = true;

      // Rotate torus
      group.rotation.y = -scrollY * 0.01; // Invert rotation direction

      group.children.forEach((mesh) => {
        const wobbleX = Math.sin(scrollY * 0.01 + mesh.rotation.x) * 0.5;
        const wobbleY = Math.cos(scrollY * 0.01 + mesh.rotation.y) * 0.5;
        mesh.rotation.x -= wobbleX * 0.05; // Invert wobble direction
        mesh.rotation.y -= wobbleY * 0.05; // Invert wobble direction
      });
    };

    const onScrollGrid = () => {
      if (variant !== 'grid' || !camera) return;

      const scrollY = window.scrollY;
      let targetFOV = 75 - scrollY * 0.12; // Increased zoom speed, starting from 75
      targetFOV = Math.max(30, Math.min(75, targetFOV)); // Clamp FOV, reduced min FOV to 30

      camera.fov = targetFOV;
      camera.updateProjectionMatrix();
    };


    const onPointerDown = (event) => {
      if (variant !== 'grid' || !camera || !group || !renderer) return;

      pointer.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
      pointer.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);

      const intersects = raycaster.intersectObjects(group.children);

      if (intersects.length > 0) {
        const clickedCube = intersects[0].object;
        clickedCube.material.color.set(0xff0000); // Change color to red for feedback
        setTimeout(() => {
          clickedCube.material.color.set(0xffffff); // Revert color back to white after a delay
        }, 200); // 200ms delay
      }
    };


    const updateCameraPosition = () => {
      const cameraOffset = new THREE.Vector3(
        (variant === 'original' ? mouseX * 8 : mouseX * 5),
        0,
        (variant === 'original' ? mouseY * 8 : mouseY * 5)
      );
      targetLookAt.copy(new THREE.Vector3(0, 0, 0).add(cameraOffset));
    };

    const addEventListeners = () => {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('wheel', onWheel);
      if (variant === 'original') {
        window.addEventListener('scroll', variant === 'original' ? onScroll : onScrollGrid);
      } else if (variant === 'grid') {
        window.addEventListener('scroll', onScrollGrid);
      }
    };

    const removeEventListeners = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', variant === 'original' ? onScroll : onScrollGrid);
      if (variant === 'grid') {
        window.removeEventListener('scroll', onScrollGrid);
      }
    };


    const animate = () => {
      if (!renderer || !scene) return;

      const delta = clock.getDelta();

      if (variant === 'original' && group) {
        group.children.forEach((mesh, index) => {
          mesh.rotation.x += 0.2 * delta;
          mesh.rotation.y += 0.1 * delta;
          const time = clock.elapsedTime + index * 10;
          mesh.material.opacity = 0.8 + Math.sin(time) * 0.1;
        });
      } else if (variant === 'grid' && group) {
        shaderMaterial.uniforms.time.value = clock.getElapsedTime();
        group.rotation.y = clock.getElapsedTime() * 0.05;
      }

   if (camera) {
         camera.lookAt(camera.position.clone().lerp(targetLookAt, damping));
         updateCameraPosition();
      }
   if (textMesh) {
         const currentScroll = window.scrollY;
         const newOpacity = Math.max(1 - currentScroll / 200, 0);
         textMesh.material.opacity = newOpacity;
         textMesh.material.transparent = true;
         textMesh.material.needsUpdate = true;
         textMesh.scale.set(1, 1, 1);
   }
   renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (camera) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      }
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    initScene(); // Initialize the scene
    addEventListeners();
    animate();
    renderer.domElement.addEventListener('pointerdown', onPointerDown); // Add pointerdown listener
    renderer.domElement.addEventListener('touchstart', onTouchStart); // Add touchstart listener
    renderer.domElement.addEventListener('touchmove', onTouchMove); // Add touchmove listener
    renderer.domElement.addEventListener('touchend', onTouchEnd); // Add touchend listener
    window.addEventListener('resize', handleResize);

    return () => {
      console.log(`Cleaning up ThreeDScene with variant: ${variant}`);
      removeEventListeners();
      renderer.domElement.removeEventListener('pointerdown', onPointerDown); // Remove pointerdown listener
      renderer.domElement.removeEventListener('touchstart', onTouchStart); // Remove touchstart listener
      renderer.domElement.removeEventListener('touchmove', onTouchMove); // Remove touchmove listener
      renderer.domElement.removeEventListener('touchend', onTouchEnd); // Remove touchend listener
      window.removeEventListener('resize', handleResize);

      if (mountRef.current && renderer) {
        mountRef.current.removeChild(renderer.domElement);
      }

      if (renderer) renderer.dispose();
      if (loadedTexture) loadedTexture.dispose();
      if (shaderMaterial) shaderMaterial.dispose();
      materials.forEach((material) => material.dispose());

      if (group) {
        group.children.forEach((child) => {
          if (child.geometry) child.geometry.dispose();
          if (child.material && child.material instanceof THREE.Material) {
            child.material.dispose();
          }
        });
      }
      if (textMesh) {
        if (textMesh.geometry) textMesh.geometry.dispose();
        if (textMesh.material) textMesh.material.dispose();
      }

      scene = null;
      camera = null;
      renderer = null;
      group = null;
    };
  }, [variant]);

  // useEffect(() => {
  //   if (mountRef.current) {
  //     // Calculate the height (viewport height - navbar height)
  //     const navbarHeight = 64; // Adjust this value if your navbar has a different height
  //     const sceneHeight = window.innerHeight - navbarHeight;
  //     mountRef.current.style.height = `${sceneHeight}px`;
  //   }
  // }, []);

  return (
    
      <div ref={mountRef} style={{pointerEvents: 'none'}}>
        {/* SEO Text - Hidden from view */}
        <div style={{ position: 'absolute', top: '-9999px', left: '-9999px', opacity: 0 }}>
            vibra alto con rasta rock
        </div>
      </div>
    
  );
};

export default ThreeDScene;
