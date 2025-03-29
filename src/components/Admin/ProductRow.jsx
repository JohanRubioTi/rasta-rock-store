import React, { useCallback } from 'react';
import useImageUploader from './hooks/useImageUploader';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ProductRowEdit from './ProductRowEdit';
import ProductRowView from './ProductRowView';
import {
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

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
  onDragEnd,
  deletingImage,
}) => {
  const {
    selectedImageFile,
    uploadingImage,
    uploadProgress,
    handleImageSelect,
    uploadImage,
    resetUploader
  } = useImageUploader(product.id, product);

  const handleSaveClick = useCallback(async () => {
    let imageUrl = product.image_urls;
    const updatedImagesArray = Array.isArray(imageUrl) ? [...imageUrl] : imageUrl ? [imageUrl] : [];

    if (selectedImageFile) {
      imageUrl = await uploadImage(product.id);
      if (imageUrl) {
        updatedImagesArray.push(imageUrl);
      }
    }

    handleSaveProduct(product.id, {
      ...product,
      image_urls: updatedImagesArray,
      has_size: product.has_size,
      has_color: product.has_color,
      sizes: product.sizes,
      category: product.category
    });
  }, [product, selectedImageFile, handleSaveProduct]);

  return editingRows[product.id] ? (
    <ProductRowEdit
      product={product}
      extendedCategories={extendedCategories}
      handleCellUpdate={handleCellUpdate}
      handleSelectChange={handleSelectChange}
      handleColorChange={handleColorChange}
      handleAddColor={handleAddColor}
      handleSizeAdd={handleSizeAdd}
      handleSizeRemove={handleSizeRemove}
      newSizeInput={newSizeInput}
      setNewSizeInput={setNewSizeInput}
      handleSaveClick={handleSaveClick}
      cancelEditRow={cancelEditRow}
      handleImageSelect={handleImageSelect}
      uploadingImage={uploadingImage}
      uploadProgress={uploadProgress}
      onDragEnd={onDragEnd}
      deletingImage={deletingImage}
    />
  ) : (
    <ProductRowView
      product={product}
      extendedCategories={extendedCategories}
      toggleEditRow={toggleEditRow}
      updateProducts={updateProducts}
    />
  );
};

export default ProductRow;
