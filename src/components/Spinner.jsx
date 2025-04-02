import React from 'react';

const Spinner = () => {
  return (
    <div className="relative w-24 h-24">
      {/* Premium Spinner with Rasta Colors */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          {/* Outer Ring - Green */}
          <div 
            className="absolute inset-0 rounded-full border-4 border-t-transparent border-rastaGreen animate-spin"
            style={{
              boxShadow: '0 0 10px rgba(0, 255, 0, 0.7)'
            }}
          ></div>
          
          {/* Middle Ring - Yellow */}
          <div 
            className="absolute inset-2 rounded-full border-4 border-t-transparent border-rastaYellow animate-spin"
            style={{
              boxShadow: '0 0 10px rgba(255, 255, 0, 0.7)',
              animationDirection: 'reverse',
              animationDuration: '1.5s'
            }}
          ></div>
          
          {/* Inner Ring - Red */}
          <div 
            className="absolute inset-4 rounded-full border-4 border-t-transparent border-rastaRed animate-spin"
            style={{
              boxShadow: '0 0 10px rgba(255, 0, 0, 0.7)',
              animationDuration: '2s'
            }}
          ></div>
          
          {/* Center Dot */}
          <div 
            className="absolute inset-8 rounded-full bg-white animate-pulse"
            style={{
              boxShadow: '0 0 15px rgba(255, 255, 255, 0.9)',
              animationDuration: '1.5s'
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
