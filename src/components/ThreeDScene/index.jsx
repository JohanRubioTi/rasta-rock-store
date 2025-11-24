import React from 'react';
import useThreeScene from '../../hooks/useThreeScene';

const ThreeDScene = ({ variant, scrollRef, lenisRef }) => {
    const mountRef = useThreeScene({ variant, scrollRef, lenisRef });

    return <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />;
};

export default ThreeDScene;
