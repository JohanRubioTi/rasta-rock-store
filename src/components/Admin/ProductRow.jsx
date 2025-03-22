import React, { useState, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ImageUploader from './ImageUploader';
import SmallImagePreview from './SmallImagePreview';
import {
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import ColorEditor from './ColorEditor';
import { supabase } from '../../supabaseClient';

const ProductRow = ({
  product,
  editingProducts,
  editingRows,
  extendedCategories,
  handleCellUpdate,
  handleSelectChange,
  handleColorChange,
  handleAddColor,
  handleSizeAdd,
  handleSizeRemove,
  newSizeInput,
  setNewSizeInput,
  toggleEditRow,
  cancelEditRow,
  handleSaveProduct,
  updateProducts,
  newProductIds,
  handleRemoveImage,
}) => {
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const handleImageSelect = useCallback((file) => {
    setSelectedImageFile(file);
  }, []);

  const uploadImage = async (productId) => {
    if (!selectedImageFile) return null;

    setUploadingImage(true);
    setUploadProgress(0);

    try {
      const timestamp = Date.now();
      const fileExt = selectedImageFile.name.split('.').pop();
      const fileName = `product_image_${productId}_${timestamp}.${fileExt}`;
      const filePath = `public/${fileName}`;
      console.log("Uploading image:", fileName, "to path:", filePath); // Log file name and path

      const { data, error: uploadError } = await supabase.storage // Destructure data
        .from('product-images')
        .upload(filePath, selectedImageFile, {
          cacheControl: '3600',
          upsert: false,
          onUploadProgress: (progress) => {
            setUploadProgress(Math.round((progress.loaded * 100) / progress.total));
          },
        });

      if (uploadError) {
        console.error("Supabase upload error details:", uploadError); // Log the error object
        alert("Error uploading image: " + uploadError.message);
        return null;
      }

      console.log("Supabase upload response data:", data); // Log the response data

      return `https://rasta-rock-store.supabase.co/storage/v1/object/public/product-images/${filePath}`;
    } finally {
      console.log("uploadImage finally block executed");
      setUploadingImage(false);
      setSelectedImageFile(null);
      setUploadProgress(0);
    }
  };

  const handleSaveClick = useCallback(async () => {
    let imageUrl = product.images;
    // Ensure images is always an array
    let updatedImagesArray = Array.isArray(imageUrl) ? [...imageUrl] : imageUrl ? [imageUrl] : []; 

    if (selectedImageFile) {
      imageUrl = await uploadImage(product.id);
      if (!imageUrl) {
        return;
      }
      updatedImagesArray = [...updatedImagesArray, imageUrl]; // Add new URL to the array
    }

    const updatedProduct = {
      ...product,
      images: updatedImagesArray, // Use the updated images array
     };

     handleSaveProduct(product.id, selectedImageFile);
  }, [product, selectedImageFile, handleSaveProduct]);

  return (
    <tr key={product.id} className="text-center ">
      <td
        className="p-2"
        contentEditable={!!editingRows[product.id]}
        suppressContentEditableWarning
        onBlur={(e) => handleCellUpdate(product.id, 'name', e.target.textContent)}
      >
        {product.name}
      </td>
      <td
        className="p-2"
        contentEditable={!!editingRows[product.id]}
        suppressContentEditableWarning
        onBlur={(e) => handleCellUpdate(product.id, 'subtitle', e.target.textContent)}
      >
        {product.subtitle}
      </td>
      <td
        className="p-2"
        contentEditable={!!editingRows[product.id]}
        suppressContentEditableWarning
        onBlur={(e) => handleCellUpdate(product.id, 'price', e.target.textContent)}
      >
        {product.price}
      </td>
      <td className="p-2">
        {editingRows[product.id] ? (
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
        ) : (
          product.category
        )}
      </td>
      <td className="p-2">
        {editingRows[product.id] ? (
          extendedCategories.find((cat) => cat.id === product.category)?.supportsColors ? (
            <ColorEditor
              product={product}
              handleColorChange={handleColorChange}
              handleAddColor={handleAddColor}
            />
          ) : (
            <span className="text-gray-500">No colors</span>
          )
        ) : product.colors && product.colors.length > 0 ? (
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
        {editingRows[product.id] ? (
          <div className="mt-2">
            <ImageUploader onImageSelect={handleImageSelect} />
            {uploadingImage && (
              <div className="mt-2">
                <p>Uploading: {uploadProgress}%</p>
                <progress value={uploadProgress} max="100" />
              </div>
            )}
            <div className="mt-2">
              <DragDropContext onDragEnd={(result) => onDragEnd(result, product.id)}>
                <Droppable droppableId="images" direction="horizontal">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="flex flex-wrap gap-2"
                    >
                      {product.images.map((imageUrl, index) => (
                        <Draggable key={imageUrl} draggableId={imageUrl} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className="relative group">
                                <img
                                  src={imageUrl}
                                  alt={`Preview ${index}`}
                                  className="w-8 h-8 object-cover rounded border border-gray-300"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImage(product.id, imageUrl)}
                                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
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
              </DragDropContext>
            </div>
          </div>
          ) : (
            product.images &&
            product.images.length > 0 && (
              <div className="flex flex-wrap justify-center">
                {expanded
                  ? product.images.map((imageUrl, index) => (
                      <SmallImagePreview key={index} imageUrl={imageUrl} />
                    ))
                  : product.images.slice(0, 3).map((imageUrl, index) => (
                      <SmallImagePreview 
                        key={index} 
                        imageUrl={imageUrl} 
                        className="w-8 h-8"
                      />
                    ))
                }
                {product.images.length > 3 && !expanded && (
                  <button
                    className="text-blue-500 text-sm ml-1"
                    onClick={() => setExpanded(true)}
                  >
                    +{product.images.length - 3} more
                  </button>
                )}
              </div>
            )
          )
        }
      </td>
      <td className="p-2">
        {editingRows[product.id] ? (
          <div className="mt-1">
            {product.sizes && product.sizes.length > 0 ? (
              product.sizes.map((size, idx) => (
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
              ))
            ) : (
              ''
            )}
            <div className="mt-1">
              <input
                type="text"
                value={newSizeInput[product.id] || ''}
                onChange={(e) =>
                  setNewSizeInput({ ...newSizeInput, [product.id]: e.target.value })
                }
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSizeAdd(product.id);
                  }
                }}
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
        ) : (
          (product.sizes && product.sizes.length > 0 && product.sizes.join(', ')) || ''
        )}
      </td>
      <td
        className="p-2"
        contentEditable={!!editingRows[product.id]}
        suppressContentEditableWarning
        onBlur={(e) => handleCellUpdate(product.id, 'inventory', e.target.textContent)}
      >
        {product.inventory !== null && product.inventory !== undefined
          ? product.inventory
          : ''}
      </td>
      <td className="p-2">
        <input
          type="checkbox"
          checked={product.has_size || false}
          onChange={(e) => handleCellUpdate(product.id, 'has_size', e.target.checked)}
          disabled={!editingRows[product.id]}
          onFocus={() =>
            console.log(
              'hasSize checkbox focused',
              product.id,
              editingRows[product.id],
              product.has_size
            )
          }
        />
      </td>
      <td className="p-2">
        <input
          type="checkbox"
          checked={product.has_color || false}
          onChange={(e) => handleCellUpdate(product.id, 'has_color', e.target.checked)}
          disabled={!editingRows[product.id]}
          onFocus={() =>
            console.log(
              'hasColor checkbox focused',
              product.id,
              editingRows[product.id],
              product.has_color
            )
          }
        />
      </td>
      <td className="p-2">
        {editingRows[product.id] ? (
          <div className="flex justify-center">
            <button
              onClick={() => handleSaveClick()}
              className="bg-blue-500 text-white p-1 rounded  mr-2"
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
        ) : (
          <div className="flex justify-center">
            <button
              onClick={() => toggleEditRow(product.id)}
              className="bg-blue-500 text-white p-1 rounded  mr-2"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => {
                const updatedProducts = editingProducts.filter((p) => p.id !== product.id);
                updateProducts(updatedProducts);
              }}
              className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default ProductRow;
