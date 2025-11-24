import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';

import { createScene, createCamera, createRenderer } from '../components/ThreeDScene/SceneManager';
import { updateSceneObjects, initBackground } from '../components/ThreeDScene/AnimationManager';

const useThreeScene = ({ variant, scrollRef, lenisRef }) => {
    const mountRef = useRef(null);
    // Mouse position ref for reactive cursor
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        let scene, camera, renderer, group, animationFrameId;
        const clock = new THREE.Clock();

        // Loading Manager
        const loadingManager = new THREE.LoadingManager();
        loadingManager.onStart = (url, itemsLoaded, itemsTotal) => {
            console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
        };
        loadingManager.onLoad = () => {
            console.log('Loading complete!');
        };
        loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
            console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
        };
        loadingManager.onError = (url) => {
            console.log('There was an error loading ' + url);
        };

        // Scene Initialization
        scene = createScene();
        camera = createCamera();
        renderer = createRenderer();

        // Important: Tone mapping for better colors
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.0;

        group = new THREE.Group();
        scene.add(group);

        // Initialize Contextual Background (InstancedMesh)
        if (variant === 'original') {
            initBackground(scene);
        }

        // Mount renderer
        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        // Create Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 7);
        scene.add(directionalLight);

        // Loaders Setup
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');

        const ktx2Loader = new KTX2Loader();
        ktx2Loader.setTranscoderPath('https://unpkg.com/three@0.160.0/examples/jsm/libs/basis/');
        ktx2Loader.detectSupport(renderer);

        const gltfLoader = new GLTFLoader(loadingManager);
        gltfLoader.setDRACOLoader(dracoLoader);
        gltfLoader.setKTX2Loader(ktx2Loader);

        const rgbeLoader = new RGBELoader(loadingManager);

        // Load Environment & Models
        rgbeLoader.load('/venice_sunset_1k.hdr', (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            scene.environment = texture;
            // Optional: scene.background = texture; // If we want the HDR as background

            if (variant === 'kyrie') {
                gltfLoader.load('/models/Kyrie.glb', (gltf) => {
                    gltf.scene.scale.set(0.5, 0.5, 0.5);
                    group.add(gltf.scene);
                });
            } else if (variant === 'original') {
                // Add torus for the original scene as placeholder for Hero object
                // In a real scenario, this would be the "Gold Vinyl" or "Rasta Badge" GLB
                const geometry = new THREE.TorusKnotGeometry(1.5, 0.5, 100, 16);
                const material = new THREE.MeshPhysicalMaterial({
                    color: 0xF7D046, // Gold
                    metalness: 1,
                    roughness: 0.2,
                    envMap: texture,
                    envMapIntensity: 1.0,
                    clearcoat: 1.0,
                    clearcoatRoughness: 0.1
                });
                const torus = new THREE.Mesh(geometry, material);
                torus.name = "heroObject";
                group.add(torus);
            }
        });

        // Mouse Move Handler
        const handleMouseMove = (event) => {
            mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation Loop
        const animate = (time) => {
            // Update Lenis
            if (lenisRef && lenisRef.current) {
                lenisRef.current.raf(time);
            }

            const elapsedTime = clock.getElapsedTime();
            const currentScroll = scrollRef ? scrollRef.current : 0;

            updateSceneObjects({
                group,
                camera,
                variant,
                scrollProgress: currentScroll,
                elapsedTime,
                scene,
                mouse: mouseRef.current
            });

            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(animate);
        };

        // Start loop
        animationFrameId = requestAnimationFrame(animate);

        // Resize Handler (Debounced)
        let resizeTimeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }, 100);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            clearTimeout(resizeTimeout);

            if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }

            // Dispose loaders
            dracoLoader.dispose();
            ktx2Loader.dispose();

            // Proper disposal of three.js objects
            scene.traverse(object => {
                if (object.isMesh) {
                    if (object.geometry) object.geometry.dispose();
                    if (object.material) {
                         if (Array.isArray(object.material)) {
                            object.material.forEach(material => material.dispose());
                         } else {
                            object.material.dispose();
                         }
                    }
                }
            });
            renderer.dispose();
        };
    }, [variant, scrollRef, lenisRef]); // Re-run if core dependencies change

    return mountRef;
};

export default useThreeScene;
