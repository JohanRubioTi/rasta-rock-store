import * as THREE from 'three';

export const createScene = () => {
    return new THREE.Scene();
};

export const createCamera = () => {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 3, 10);
    return camera;
};

export const createRenderer = () => {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    return renderer;
};
