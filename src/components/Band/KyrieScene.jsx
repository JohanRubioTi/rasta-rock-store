import React from 'react';
import ThreeDScene from '../ThreeDScene';

const KyrieScene = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
      <ThreeDScene variant="kyrie" />
    </div>
  );
};

export default KyrieScene;
