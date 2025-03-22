import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

const ColorEditor = ({ product, handleColorChange, handleAddColor }) => {
  return (
    <div className="flex">
      {product.colors && product.colors.length > 0 ? (
        product.colors.map((color, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: color,
              width: '1.5rem',
              height: '1.5rem',
              border: '1px solid #ccc',
              margin: '0 0.5rem',
            }}
          >
            <input
              type="color"
              value={color}
              onChange={(e) => handleColorChange(product.id, idx, e.target.value)}
              className="w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        ))
      ) : (
        <span className="text-gray-500">No colors</span>
      )}
    </div>
  );
};

export default ColorEditor;
