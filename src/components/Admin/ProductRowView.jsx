import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import ProductImageGallery from './ProductImageGallery';

const ProductRowView = ({
  product,
  editingProducts,
  toggleEditRow,
  updateProducts
}) => {
  return (
    <tr className="text-center">
      <td className="p-2">{product.name}</td>
      <td className="p-2">{product.subtitle}</td>
      <td className="p-2">{product.price}</td>
      <td className="p-2">{product.category}</td>
      
      <td className="p-2">
        {product.colors?.length > 0 ? (
          <div className="flex">
            {product.colors.map((color, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: color,
                  width: '1.5rem',
                  height: '1.5rem',
                  border: '1px solid #ccc',
                  margin: '0 0.5rem',
                }}
              />
            ))}
          </div>
        ) : (
          <span className="text-gray-500">Sin colores</span>
        )}
      </td>
      
      <td className="p-2">
        <ProductImageGallery imageUrls={product.image_urls} />
      </td>
      
      <td className="p-2">
        {product.sizes?.join(', ') || ''}
      </td>
      
      <td className="p-2">
        {product.inventory ?? ''}
      </td>
      
      <td className="p-2">
        <input type="checkbox" checked={product.has_size || false} disabled />
      </td>
      
      <td className="p-2">
        <input type="checkbox" checked={product.has_color || false} disabled />
      </td>
      
      <td className="p-2">
        <div className="flex justify-center">
          <button
            onClick={() => toggleEditRow(product.id)}
            className="bg-blue-500 text-white p-1 rounded mr-2"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => {
              const updatedProducts = editingProducts.filter(p => p.id !== product.id);
              updateProducts(updatedProducts);
            }}
            className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductRowView;
