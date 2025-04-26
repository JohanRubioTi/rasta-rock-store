import { useState, useEffect, useCallback } from 'react';

const useProductManagement = (initialProducts, originalProducts, setOriginalProducts, newProductIds, setNewProductIds) => {
  const [editingProducts, setEditingProducts] = useState(initialProducts || []);
  const [editingRows, setEditingRows] = useState({});
  const [newSizeInput, setNewSizeInput] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

  useEffect(() => {
    setEditingProducts(initialProducts);
  }, [initialProducts]);

  const updateProducts = useCallback((updatedProducts) => {
    setEditingProducts(updatedProducts);
  }, []);

  const toggleEditRow = useCallback((productId) => {
    setEditingRows((prev) => ({ ...prev, [productId]: !prev[productId] }));
    // Clear new size input when toggling edit off.
    if (editingRows[productId]) {
      setNewSizeInput((prev) => ({ ...prev, [productId]: '' }));
    }
  }, [editingRows]);

  const cancelEditRow = useCallback((productId) => {
    const isNewProduct = newProductIds.includes(productId);

    if (isNewProduct) {
      setEditingProducts((prev) => prev.filter((p) => p.id !== productId));
      setNewProductIds((prevIds) => prevIds.filter((id) => id !== productId));
      // Also remove from the original products state if it was temporarily added
      setOriginalProducts((prev) => prev.filter((p) => p.id !== productId));
    } else {
      const originalProduct = originalProducts.find((p) => p.id === productId);
      if (originalProduct) {
        setEditingProducts((prev) =>
          prev.map((product) => (product.id === productId ? originalProduct : product))
        );
      }
    }

    setEditingRows((prev) => ({ ...prev, [productId]: false }));
    setNewSizeInput((prev) => ({ ...prev, [productId]: '' }));
  }, [newProductIds, originalProducts, setOriginalProducts, setNewProductIds]);

  const handleCellUpdate = useCallback((productId, field, newValue) => {
    setEditingProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === productId) {
          let updatedValue = newValue;
          if (field === 'price') {
            updatedValue = Number(newValue);
            if (isNaN(updatedValue) || updatedValue <= 0) {
              alert('Por favor, ingrese un precio válido mayor a cero.');
              return product;
            }
          } else if (field === 'name') {
            if (!newValue) {
              alert('Por favor, ingrese un nombre de producto válido.');
              return product;
            }
          } else if (field === 'hasSize') {
            return {
              ...product,
              hasSize: updatedValue,
              sizes: updatedValue ? product.sizes || [] : [],
            };
          } else if (field === 'hasColor') {
            return {
              ...product,
              hasColor: updatedValue,
              colors: updatedValue ? product.colors || [] : [],
            };
          }
          return { ...product, [field]: updatedValue };
        }
        return product;
      })
    );
  }, []);

  const handleSelectChange = useCallback((productId, value) => {
    const updatedProducts = editingProducts.map((product) => {
      if (product.id === productId) {
        return { ...product, category: value };
      }
      return product;
    });
    updateProducts(updatedProducts);
  }, [editingProducts, updateProducts]);

  const handleColorChange = useCallback((productId, index, newColor) => {
    const updatedProducts = editingProducts.map(product => {
      if (product.id === productId) {
        const updatedColors = [...(product.colors || [])];
        updatedColors[index] = newColor;
        return { ...product, colors: updatedColors };
      }
      return product;
    });
    updateProducts(updatedProducts);
  }, [editingProducts, updateProducts]);

  const handleAddColor = useCallback((productId) => {
    const updatedProducts = editingProducts.map(product => {
      if (product.id === productId) {
        const updatedColors = product.colors ? [...product.colors, "#000000"] : ["#000000"];
        return { ...product, colors: updatedColors };
      }
      return product;
    });
    updateProducts(updatedProducts);
  }, [editingProducts, updateProducts]);

  const handleSizeAdd = useCallback((productId) => {
    const newSize = newSizeInput[productId]?.trim();
    if (!newSize) return;
    const updatedProducts = editingProducts.map(product => {
      if (product.id === productId) {
        const updatedSizes = product.sizes ? [...product.sizes, newSize] : [newSize];
        return { ...product, sizes: updatedSizes };
      }
      return product;
    });
    updateProducts(updatedProducts);
    setNewSizeInput(prev => ({ ...prev, [productId]: "" }));
  }, [editingProducts, newSizeInput, updateProducts]);

  const handleSizeRemove = useCallback((productId, index) => {
    const updatedProducts = editingProducts.map(product => {
      if (product.id === productId) {
        const updatedSizes = product.sizes.filter((_, idx) => idx !== index);
        return { ...product, sizes: updatedSizes };
      }
      return product;
    });
    updateProducts(updatedProducts);
  }, [editingProducts, updateProducts]);

  const handleSort = useCallback((key, setConfig = true) => {
    let direction = 'ascending';
    if (setConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    if (setConfig) {
      setSortConfig({ key, direction });
    }

    const sortedProducts = [...editingProducts].sort((a, b) => {
      const keyA = a[key] || '';
      const keyB = b[key] || '';
      if (keyA < keyB) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (keyA > keyB) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    if (editingProducts.length) {
      updateProducts(sortedProducts);
    }
  }, [editingProducts, sortConfig, updateProducts]);

  const handleDragEnd = useCallback((result, productId, handleRemoveImageCallback) => { // Added handleRemoveImageCallback
    const { source, destination, type } = result;

    // Handle image deletion via drag-out
    if (!destination && type === 'images') {
      const sourceIndex = source.index;
      const imageUrlToDelete = editingProducts.find(p => p.id === productId)?.image_urls[sourceIndex];
      if (imageUrlToDelete && handleRemoveImageCallback) { // Check if callback exists
         handleRemoveImageCallback(productId, imageUrlToDelete)(); // Execute the callback
      }
      return; // Exit early
    }

    if (!destination) return; // dropped outside a list

    if (type === 'colors') {
      const updatedProducts = editingProducts.map(product => {
        if (product.id === productId) {
          let items = Array.from(product.colors || []);
          const [reorderedItem] = items.splice(source.index, 1);
          items.splice(destination.index, 0, reorderedItem);
          return { ...product, colors: items };
        }
        return product;
      });
      updateProducts(updatedProducts);
    } else if (type === 'images') {
      const updatedProducts = editingProducts.map(product => {
        if (product.id === productId) {
          const newImages = Array.from(product.image_urls || []);
          const [reorderedImage] = newImages.splice(source.index, 1);
          newImages.splice(destination.index, 0, reorderedImage);
          return { ...product, image_urls: newImages };
        }
        return product;
      });
      updateProducts(updatedProducts);
    }
  }, [editingProducts, updateProducts]); // Removed handleRemoveImage from dependencies here

  return {
    editingProducts,
    updateProducts,
    editingRows,
    setEditingRows,
    toggleEditRow,
    cancelEditRow,
    handleCellUpdate,
    handleSelectChange,
    handleColorChange,
    handleAddColor,
    handleSizeAdd,
    handleSizeRemove,
    newSizeInput,
    setNewSizeInput,
    sortConfig,
    handleSort,
    handleDragEnd, // Renamed from onDragEnd for clarity
  };
};

export default useProductManagement;