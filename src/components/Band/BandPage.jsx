import React from 'react';

const BandPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Featured Bands</h1>
      <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-2">Band Name</h2>
        <p className="text-gray-400 mb-4">Band bio and information...</p>
        {/* Placeholder for band image/video */}
        <div className="bg-gray-800 h-64 rounded-md"></div>
      </div>
    </div>
  );
};

export default BandPage;
