import React from 'react';

const SmallImagePreview = ({ imageUrl }) => {
  return (
    <img
      src={imageUrl}
      alt="Product preview"
      className="w-8 h-8 border-2 border-gray-300 rounded-lg mr-1 mb-1 object-cover bg-gray-100"
      onError={(e) => {
        e.target.style.display = 'none';
      }}
    />
  );
};

export default SmallImagePreview;
