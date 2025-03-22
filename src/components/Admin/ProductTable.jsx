import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import TableHeader from './TableHeader';
import ProductRow from './ProductRow';
import { PlusIcon } from '@heroicons/react/24/outline';

const ProductTable = ({
  editingProducts,
  extendedCategories,
  editingRows,
  handleCellUpdate,
  handleSelectChange,
  handleColorChange,
  handleAddColor,
  handleRemoveImage,
  handleImageUpload,
  handleSizeAdd,
  handleSizeRemove,
  newSizeInput,
  setNewSizeInput,
  toggleEditRow,
  cancelEditRow,
  handleSaveProduct,
  updateProducts,
  sortConfig,
  handleSort,
  onDragEnd,
  newProductIds
}) => {

    const handleAddProduct = async () => {
    const newId =
      editingProducts.length > 0
        ? Math.max(...editingProducts.map(p => Number(p.id))) + 1
        : 1;
    const defaultCategory = extendedCategories.length > 0 ? extendedCategories[0].id : "";
    const categoryInfo = extendedCategories.find(cat => cat.id === defaultCategory);

    const newProduct = {
      id: newId,
      name: '',
      description: '',
      price: 0,
      image_urls: [],
      category: defaultCategory,
      has_size: categoryInfo?.supportsSizes || false,
      has_color: categoryInfo?.supportsColors || false,
      sizes: categoryInfo?.supportsSizes ? [] : [],
      colors: categoryInfo?.supportsColors ? [] : [],
      inventory: 0,
    };

    updateProducts([newProduct, ...editingProducts]);
    setNewProductIds(prev => [...prev, newId]);
    toggleEditRow(newId);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="bg-black bg-opacity-75 backdrop-blur-xl rasta p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2 text-white">Productos</h2>
        <button
          onClick={handleAddProduct}
          className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center mb-4"
        >
          <PlusIcon className="h-5 w-5 mr-2" /> Agregar Producto
        </button>
        <table className="w-full">
          <TableHeader sortConfig={sortConfig} handleSort={handleSort} />
          <tbody>
            {editingProducts.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                editingRows={editingRows}
                extendedCategories={extendedCategories}
                handleCellUpdate={handleCellUpdate}
                handleSelectChange={handleSelectChange}
                handleColorChange={handleColorChange}
                handleAddColor={handleAddColor}
                handleRemoveImage={handleRemoveImage}
                handleImageUpload={handleImageUpload}
                handleSizeAdd={handleSizeAdd}
                handleSizeRemove={handleSizeRemove}
                newSizeInput={newSizeInput}
                setNewSizeInput={setNewSizeInput}
                toggleEditRow={toggleEditRow}
                cancelEditRow={cancelEditRow}
                handleSaveProduct={handleSaveProduct}
                updateProducts={updateProducts}
                newProductIds={newProductIds}
              />
            ))}
          </tbody>
        </table>
      </div>
    </DragDropContext>
  );
};

export default ProductTable;
