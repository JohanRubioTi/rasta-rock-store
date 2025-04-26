// index.jsx: Orchestrates the ThreeDScene component using modularized scene components.

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { animate } from "./AnimationManager";


/**
 * ThreeDScene component - Manages the 3D scene using modularized components.
 * @param {object} props - Component props.
 * @param {string} props.variant - The scene variant ('original', 'grid', 'kyrie').
 * @param {boolean} props.loading - Whether to display the loading animation.
 */
const ThreeDScene = ({ variant, loading = false }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, targetLookAt, group;

    const onMouseMove = () => {};
    const onTouchStart = () => {
      console.log("start");
    };
    const onTouchMove = () => {
      console.log("move");
    };
    const onTouchEnd = () => {
      console.log("end");
    };
    const onWheel = () => {
      console.log("wheel");
    };
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    camera.position.set(0, 3, 10);
    group = new THREE.Group();
    scene.add(group);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const createTorus = (texture) => {
      const geometry = new THREE.TorusKnotGeometry(2, 0.6, 100, 16);
      const material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 1,
        roughness: 0,
        envMap: texture,
        envMapIntensity: 1.0,
      });
      const torus = new THREE.Mesh(geometry, material);
      return torus;
    };
    const createLights = () => {
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(1, 1, 1);
      return directionalLight;
    };
    const createProductCube = (texture) => {
      const geometry = new THREE.BoxGeometry(3, 3, 3);
      const material = new THREE.MeshStandardMaterial({
        map: texture,
      });
      const cube = new THREE.Mesh(geometry, material);
      return cube;
    };
    
    const createText = (texture, font) => {
      const textGeometry = new TextGeometry('Rasta Rock', {
        font: font,
        size: 1.5,
        height: 0.5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.08,
        bevelOffset: 0,
        bevelSegments: 5
      });
    
      textGeometry.center();
      const textMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 1,
        roughness: 0,
        envMap: texture,
      });
      return new THREE.Mesh(textGeometry, textMaterial);
    };
    if (!loading) {
      new RGBELoader()
        .setDataType(THREE.UnsignedByteType)
        .setPath("")
        .load("/venice_sunset_1k.hdr", (texture) => {
          texture.mapping = THREE.EquirectangularReflectionMapping;
          scene.environment = texture;
          const lights = createLights();
          if (variant === "original") {
            const torus = createTorus(texture);
            const fontLoader = new THREE.FontLoader();
            fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
              const text = createText(texture, font);
              group.add(text);
            });
            group.add(torus);
           
          } else if (variant === "cube") {
            const cube = createProductCube(texture);
            group.add(cube);
          
            

           
          } else if (variant === "kyrie") {
            const loader = new GLTFLoader();
            loader.load("./models/Kyrie.glb", (gltf) => {
              gltf.scene.scale.set(0.5, 0.5, 0.5);
              group.add(gltf.scene);
            });
          }
          group.add(lights);
        });
        
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      targetLookAt = new THREE.Vector3(0, 0, 0);
      if(variant === "cube") {
        camera.position.set(0, 0, 10);
      }
    };

    const addEventListeners = () => {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("touchmove", onTouchMove);
      window.addEventListener("wheel", onWheel);
    };

    const removeEventListeners = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("wheel", onWheel);
    };

    addEventListeners();
    animate(
      renderer,
      scene,
      loading,
      variant,
      group,
      camera,
      targetLookAt,
      0.020
    );

    renderer.domElement.addEventListener("pointerdown", () => {
      console.log("down");
    });
    renderer.domElement.addEventListener("touchstart", onTouchStart);
    renderer.domElement.addEventListener("touchmove", onTouchMove);
    renderer.domElement.addEventListener("touchend", onTouchEnd);

    window.addEventListener("resize", handleResize);

    return () => {
      removeEventListeners();
      renderer.domElement.removeEventListener("pointerdown", () => {
        console.log("down");
      });
      renderer.domElement.removeEventListener("touchstart", onTouchStart);
      renderer.domElement.removeEventListener("touchmove", onTouchMove);
      renderer.domElement.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", handleResize);

      if (mountRef.current && renderer) {
        mountRef.current.removeChild(renderer.domElement);
      }

      scene = null;
      camera = null;
      renderer = null;
      group = null;    
    };
  }, [loading, variant]);
  
  return (
    <>
      <div ref={mountRef} style={{ pointerEvents: "auto" }} />
      {/* SEO Text - Hidden from view */}
      <div style={{ position: "absolute", top: "-9999px", left: "-9999px", opacity: 0 }}>
        vibra alto con rasta rock
      </div>
    </>
  );
};

export default ThreeDScene;







