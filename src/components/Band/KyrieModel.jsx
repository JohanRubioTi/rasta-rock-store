import React, { useRef, useEffect, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

export default function KyrieModel(props) {
  const modelRef = useRef();
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load('/models/kyrie.glb', (gltf) => {
        setModel(gltf.scene);
    }, undefined, (error) => {
      console.error('An error happened', error);
    });
  }, []);

  useEffect(() => {
    if (model) {
        modelRef.current.add(model);

      const newRotation = new THREE.Euler(-Math.PI / 2, 0, 0, 'XYZ');
      model.rotation.copy(newRotation)

      
    }
  }, [model]);

  return <group ref={modelRef} {...props} />;
}
KyrieModel.preload = () => {
    new GLTFLoader().load('/models/kyrie.glb', () => {});
  };