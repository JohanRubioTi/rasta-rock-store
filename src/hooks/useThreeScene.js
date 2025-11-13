import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

import { createScene, createCamera, createRenderer } from '../components/ThreeDScene/SceneManager';
import { updateSceneObjects } from '../components/ThreeDScene/AnimationManager';

const useThreeScene = (variant, scrollProgress) => {
    const mountRef = useRef(null);
    const scrollProgressRef = useRef(scrollProgress);

    // Update the ref whenever scrollProgress changes, without re-triggering the effect
    useEffect(() => {
        scrollProgressRef.current = scrollProgress;
    }, [scrollProgress]);

    const createLights = () => {
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(1, 1, 1);
        return directionalLight;
    };

    useEffect(() => {
        let scene, camera, renderer, group, animationFrameId;
        const clock = new THREE.Clock();

        // Scene Initialization
        scene = createScene();
        camera = createCamera();
        renderer = createRenderer();
        group = new THREE.Group();
        scene.add(group);

        // Mount renderer
        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        // Load Environment & Models
        const rgbeLoader = new RGBELoader();
        rgbeLoader.load('/venice_sunset_1k.hdr', (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            scene.environment = texture;

            const lights = createLights();
            group.add(lights);

            if (variant === 'kyrie') {
                const dracoLoader = new DRACOLoader();
                dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
                const loader = new GLTFLoader();
                loader.setDRACOLoader(dracoLoader)
                loader.load('/models/Kyrie.glb', (gltf) => {
                    gltf.scene.scale.set(0.5, 0.5, 0.5);
                    group.add(gltf.scene);
                });
            } else if (variant === 'original') {
                // Add torus for the original scene
                const geometry = new THREE.TorusKnotGeometry(2, 0.6, 100, 16);
                const material = new THREE.MeshPhysicalMaterial({
                    color: 0xffffff,
                    metalness: 1,
                    roughness: 0,
                    envMap: texture,
                    envMapIntensity: 1.0,
                });
                const torus = new THREE.Mesh(geometry, material);
                group.add(torus);
            }
        });

        // Animation Loop
        const animate = () => {
            const elapsedTime = clock.getElapsedTime();

            updateSceneObjects({
                group,
                camera,
                variant,
                scrollProgress: scrollProgressRef.current,
                elapsedTime,
            });

            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        // Event Listeners
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            // Proper disposal of three.js objects to prevent memory leaks
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
    }, [variant]); // Only re-run the effect if the variant changes

    return mountRef;
};

export default useThreeScene;