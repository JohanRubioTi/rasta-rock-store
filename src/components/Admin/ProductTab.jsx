import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import useProducts from '../../hooks/useProducts';
import ProductTable from './ProductTable';
import useProductSaver from '../../hooks/useProductSaver';

const ProductTab = () => {
  const { products, categories, loading, error, fetchProducts, setProducts } = useProducts();
  const [newProductIds, setNewProductIds] = React.useState([]);

  // Product state management
  const productManagement = useProductManagement( // Assuming useProductManagement is a custom hook
    products,
    products,
    setProducts,
    newProductIds,
    setNewProductIds
  );

  // Product saving/API interactions
  const productSaver = useProductSaver(
    productManagement.editingProducts,
    productManagement.updateProducts,
    setProducts,
    productManagement.setEditingProducts,
    productManagement.setEditingRows,
    fetchProducts,
    newProductIds,
    setNewProductIds
  );

  // Derived category data
  const extendedCategories = categories.map(cat => ({
    ...cat,
    supportsSizes: ['clothing'].includes(cat.id),
    supportsColors: ['clothing', 'accessories', 'handmade-decorations'].includes(cat.id)
  }));

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <DragDropContext 
      onDragEnd={(result) => productManagement.handleDragEnd(
        result, 
        result.draggableId.split('-')[0], 
        productSaver.handleRemoveImage
      )}
    >
      <ProductTable
        {...productManagement}
        {...productSaver}
        extendedCategories={extendedCategories}
        newProductIds={newProductIds}
      />
    </DragDropContext>
  );
};

export default ProductTab;
