import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import ImageUploader from '../../components/Admin/ImageUploader';
import ColorEditor from './ColorEditor';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAtomValue } from 'jotai';
import { handleRemoveImageAtom } from '../../store/adminAtoms';

const ProductRowEdit = ({
  product,
  extendedCategories,
  handleCellUpdate,
  handleSelectChange,
  handleColorChange,
  handleAddColor,
  handleSizeAdd,
  handleSizeRemove,
  newSizeInput,
  setNewSizeInput,
  handleSaveClick,
  cancelEditRow,
  handleImageSelect,
  uploadingImage,
  uploadProgress,
  onDragEnd, // Receive onDragEnd prop
  deletingImage // Receive deletingImage prop
}) => {
  const handleRemoveImage = useAtomValue(handleRemoveImageAtom); // Get handleRemoveImage from atom

  return (
    <tr className="text-center">
      {/* Name */}
      <td
        className="p-2"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => handleCellUpdate(product.id, 'name', e.target.textContent)}
      >
        {product.name}
      </td>

      {/* Subtitle */}
      <td
        className="p-2"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => handleCellUpdate(product.id, 'subtitle', e.target.textContent)}
      >
        {product.subtitle}
      </td>

      {/* Price */}
      <td
        className="p-2"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => handleCellUpdate(product.id, 'price', e.target.textContent)}
      >
        {product.price}
      </td>

      {/* Category */}
      <td className="p-2">
        <select
          value={product.category}
          onChange={(e) => handleSelectChange(product.id, e.target.value)}
          className="w-full"
        >
          {extendedCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </td>

      {/* Has Size */}
      <td className="p-2">
        {extendedCategories.find((cat) => cat.id === product.category)?.supportsSizes ? (
          <input
            type="checkbox"
            checked={product.has_size || false}
            onChange={(e) => handleCellUpdate(product.id, 'has_size', e.target.checked)}
          />
        ) : (
          <span className="text-gray-500">No size option</span>
        )}
      </td>

      {/* Has Colors */}
      <td className="p-2">
        {extendedCategories.find((cat) => cat.id === product.category)?.supportsColors ? (
          <input
            type="checkbox"
            checked={product.has_color || false}
            onChange={(e) => handleCellUpdate(product.id, 'has_color', e.target.checked)}
          />
        ) : (
          <span className="text-gray-500">No color option</span>
        )}
      </td>

      {/* Colors */}
      <td className="p-2">
        {extendedCategories.find((cat) => cat.id === product.category)?.supportsColors ? (
          <ColorEditor
            product={product}
            handleColorChange={handleColorChange}
            handleAddColor={handleAddColor}
          />
        ) : (
          <span className="text-gray-500">No colors</span>
        )}
      </td>

      {/* Images */}
      <td className="p-2">
        <div className="mt-2">
          <ImageUploader 
            onUploadComplete={{
              productId: product.id,
              callback: (imageUrl) => {
                if (product?.image_urls) {
                  handleCellUpdate(product.id, 'image_urls', [
                    ...(product.image_urls || []),
                    imageUrl
                  ]);
                }
              }
            }}
          />
          {uploadingImage && (
            <div className="mt-2">
              <p>Uploading: {uploadProgress}%</p>
              <progress value={uploadProgress} max="100" />
            </div>
          )}
          <div className="mt-2">
            <Droppable droppableId="images" direction="horizontal" onDragEnd={onDragEnd}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-wrap gap-2">
                  {product.image_urls?.map((imageUrl, index) => (
                    <Draggable key={`${product.id}-${index}`} draggableId={`${product.id}-${index}`} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <div className="relative group">
                            <img
                              src={imageUrl}
                              alt={`Preview ${index}`}
                              className={`w-8 h-8 object-cover rounded border border-gray-300 ${
                                deletingImage === imageUrl ? 'opacity-50' : '' // Apply opacity when deleting
                              }`}
                              style={{
                                filter: deletingImage === imageUrl ? 'grayscale(100%)' : 'none', // Apply grayscale when deleting
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                console.log('Delete button clicked', { productId: product.id, imageUrl });
                                handleRemoveImage(product.id, imageUrl)(); // Call handleRemoveImage from atom
                              }}
                              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                              disabled={deletingImage === imageUrl} // Disable button when deleting
                            >
                              <XMarkIcon className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </td>

      {/* Sizes */}
      <td className="p-2">
        <div className="mt-1">
          {product.sizes?.map((size, idx) => (
            <span
              key={idx}
              className="inline-flex items-center bg-gray-200 text-sm text-gray-800 rounded-full px-2 py-1 mr-1 mb-1"
            >
              {size}
              <button
                onClick={() => handleSizeRemove(product.id, idx)}
                className="ml-1 text-red-600 hover:text-red-800"
              >
                <XMarkIcon className="h-3 w-3" />
              </button>
            </span>
          ))}
          <div className="mt-1">
            <input
              type="text"
              value={newSizeInput[product.id] || ''}
              onChange={(e) => setNewSizeInput({ ...newSizeInput, [product.id]: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && handleSizeAdd(product.id)}
              placeholder="Talla"
              className="border border-gray-300 rounded px-2 py-1 text-sm bg-white text-black"
            />
            <button
              onClick={() => handleSizeAdd(product.id)}
              className="ml-2 bg-green-500 text-white px-2 py-1 rounded text-sm hover:bg-green-600"
            >
              Agregar
            </button>
          </div>
        </div>
      </td>

      {/* Actions */}
      <td className="p-2">
        <div className="flex justify-center">
          <button
            onClick={handleSaveClick}
            className="bg-blue-500 text-white p-1 rounded mr-2"
          >
            <CheckIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => cancelEditRow(product.id)}
            className="bg-gray-500 text-white p-1 rounded hover:bg-gray-600"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductRowEdit;
