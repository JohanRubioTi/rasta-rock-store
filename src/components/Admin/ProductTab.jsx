import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { adminStateAtom } from '../../store/adminAtoms';
import { PencilIcon, CheckIcon, XMarkIcon, PlusIcon, TrashIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const ProductTab = () => {
  const [adminState, setAdminState] = useAtom(adminStateAtom);
  const initialProducts = adminState.products || [];
  const initialCategories = adminState.categories || [];

  // Extend categories with additional fields if not present.
  const extendedCategories = initialCategories.map(cat => {
    // Default: 'clothing' supports sizes and colors; accessories and handmade-decorations support colors.
    let supportsSizes = false;
    let supportsColors = false;
    if (cat.id === 'clothing') {
      supportsSizes = true;
      supportsColors = true;
    } else if (cat.id === 'accessories' || cat.id === 'handmade-decorations') {
      supportsColors = true;
    }
    return { ...cat, supportsSizes, supportsColors };
  });

  const [editingProducts, setEditingProducts] = useState(initialProducts);
  const [editingRows, setEditingRows] = useState({});
  const [newProductIds, setNewProductIds] = useState([]); // Track IDs of newly added products
  // For sizes tag editor, track temporary new size input per product.
  const [newSizeInput, setNewSizeInput] = useState({});

  // Sync editingProducts with adminState.products changes
  useEffect(() => {
    setEditingProducts(adminState.products);
  }, [adminState.products]);

  const updateProducts = (updatedProducts) => {
    setEditingProducts(updatedProducts);
    setAdminState({ ...adminState, products: updatedProducts });
  };

  const toggleEditRow = (productId) => {
    setEditingRows(prev => ({ ...prev, [productId]: !prev[productId] }));
    // Clear new size input when toggling edit off.
    if (editingRows[productId]) {
      setNewSizeInput(prev => ({ ...prev, [productId]: "" }));
    }
  };

  const cancelEditRow = (productId) => {
    const isNewProduct = newProductIds.includes(productId);

    let updatedProducts;
    if (isNewProduct) {
      // If it's a new product, remove it from editingProducts and newProductIds.
      updatedProducts = editingProducts.filter(p => p.id !== productId);
      setNewProductIds(prevIds => prevIds.filter(id => id !== productId));
    } else {
      // If it's an existing product, revert to the original value from adminState.products.
      const originalProduct = adminState.products.find(p => p.id === productId);
      updatedProducts = editingProducts.map(product =>
        product.id === productId ? (originalProduct || product) : product
      );
    }
    updateProducts(updatedProducts);
    // Revert changes made by handleCellUpdate
    const revertedProducts = editingProducts.map(product => {
      if (product.id === productId) {
        return originalProduct || product;
      }
      return product;
    });
    updateProducts(revertedProducts);
    setEditingRows(prev => ({ ...prev, [productId]: false }));
    setNewSizeInput(prev => ({ ...prev, [productId]: "" }));
  };

  const handleCellUpdate = (productId, field, newValue) => {
    const updatedProducts = editingProducts.map(product => {
      if (product.id === productId) {
        let updatedValue = newValue;
        if (field === 'price') {
          updatedValue = Number(newValue);
          if (isNaN(updatedValue) || updatedValue <= 0) {
            alert("Por favor, ingrese un precio válido mayor a cero.");
            return product; // Return original product to avoid updating state
          }
        } else if (field === 'name') {
          if (!newValue) {
            alert("Por favor, ingrese un nombre de producto válido.");
            return product;
          }
        } else if (field === 'hasSize') {
          updatedValue = newValue;
          // If hasSize is true, initialize sizes to an empty array. Otherwise, set to null.
          return { ...product, hasSize: updatedValue, sizes: updatedValue ? [] : null };
        } else if (field === 'hasColor') {
          updatedValue = newValue;
          // If hasColor is true, initialize colors to an empty array. Otherwise, set to null.
          return { ...product, hasColor: updatedValue, colors: updatedValue ? [] : null };
        }
        return { ...product, [field]: updatedValue };
      }
      return product;
    });
    updateProducts(updatedProducts);
  };

  const handleSelectChange = (productId, value) => {
    const updatedProducts = editingProducts.map(product => {
      if (product.id === productId) {
        return { ...product, category: value };
      }
      return product;
    });
    updateProducts(updatedProducts);
  };

  const handleAddProduct = () => {
    const newId =
      editingProducts.length > 0
        ? Math.max(...editingProducts.map(p => Number(p.id))) + 1
        : 1;
    const defaultCategory = extendedCategories.length > 0 ? extendedCategories[0].id : "";
    const categoryInfo = extendedCategories.find(cat => cat.id === defaultCategory);
    const newProduct = {
      id: newId,
      name: '', // Start with empty name for validation
      subtitle: '',
      description: '',
      price: 0,
      images: [],
      category: defaultCategory,
      colors: categoryInfo && categoryInfo.supportsColors ? [] : null,
      sizes: categoryInfo && categoryInfo.supportsSizes ? [] : null,
      details: '',
      specifications: '',
      inventory: 0,
      hasSize: false,
      hasColor: false,
    };

    // Add the new product to the state *before* validation (but in edit mode)
    const updatedProducts = [newProduct, ...editingProducts];
    updateProducts(updatedProducts);
    setEditingRows(prev => ({ ...prev, [newId]: true })); // Enable edit mode for the new product
    setNewProductIds(prevIds => [...prevIds, newId]); // Track the ID as a new product
  };

    const validateProduct = (product) => {
    if (!product.name.trim()) {
      alert("El nombre del producto no puede estar vacío.");
      return false;
    }
    if (product.price <= 0) {
      alert("El precio debe ser mayor que cero.");
      return false;
    }
    // Add more validations as needed
    return true;
  };

const handleSaveProduct = (productId) => {
    const productToSave = editingProducts.find(p => p.id === productId);

    if (!validateProduct(productToSave)) {
      return; // Stop if validation fails
    }

    toggleEditRow(productId); // Proceed to save and exit edit mode
  };

  const handleColorChange = (productId, index, newColor) => {
    const updatedProducts = editingProducts.map(product => {
      if (product.id === productId) {
        const updatedColors = [...(product.colors || [])];
        updatedColors[index] = newColor;
        return { ...product, colors: updatedColors };
      }
      return product;
    });
    updateProducts(updatedProducts);
  };

  const handleAddColor = (productId) => {
    const updatedProducts = editingProducts.map(product => {
      if (product.id === productId) {
        const updatedColors = product.colors ? [...product.colors, "#000000"] : ["#000000"];
        return { ...product, colors: updatedColors };
      }
      return product;
    });
    updateProducts(updatedProducts);
  };

  // Handle remove image
  const handleRemoveImage = (productId, imageIndex) => {
    const updatedProducts = editingProducts.map(product => {
      if (product.id === productId) {
        const updatedImages = product.images.filter((_, idx) => idx !== imageIndex);
        return { ...product, images: updatedImages };
      }
      return product;
    });
    updateProducts(updatedProducts);
  };


  // Handle file upload for images. Accepts multiple files.
  const handleImageUpload = (productId, event) => {
    const files = Array.from(event.target.files);
    const fileURLs = files.map(file => URL.createObjectURL(file));
    const updatedProducts = editingProducts.map(product => {
      if (product.id === productId) {
        // Append new images to existing images array
        return { ...product, images: [...(product.images || []), ...fileURLs] };
      }
      return product;
    });
    updateProducts(updatedProducts);
  };

  const handleSizeAdd = (productId) => {
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
  };

  const handleSizeRemove = (productId, index) => {
    const updatedProducts = editingProducts.map(product => {
      if (product.id === productId) {
        const updatedSizes = product.sizes.filter((_, idx) => idx !== index);
        return { ...product, sizes: updatedSizes };
      }
      return product;
    });
    updateProducts(updatedProducts);
  };

  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

  useEffect(() => {
    // Apply initial sort on component mount
    handleSort(sortConfig.key, false);
  }, []);

  const handleSort = (key, setConfig = true) => {
    let direction = 'ascending';
    if (setConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    if(setConfig) {
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
   if(editingProducts.length) {
        updateProducts(sortedProducts);
   }
};


  const onDragEnd = (result, productId) => {
    if (!result.destination) {
      return;
    }
  
    const { source, destination, type } = result;
  
    if (type === 'colors') {
        const productIdToUpdate = productId;
        const updatedProducts = editingProducts.map(product => {
          if (product.id === productIdToUpdate) {
            let items = Array.from(product.colors);
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
          const newImages = Array.from(product.images);
          const [reorderedImage] = newImages.splice(source.index, 1);
          newImages.splice(destination.index, 0, reorderedImage);
          return { ...product, images: newImages };
        }
        return product;
      });
      updateProducts(updatedProducts);
    }
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
          <thead>
            <tr className="bg-black bg-opacity-75 text-white">
              <th className="p-2 cursor-pointer" onClick={() => handleSort('name')}>
                Nombre
                {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? <ChevronUpIcon className="h-4 w-4 inline" /> : <ChevronDownIcon className="h-4 w-4 inline" />)}
              </th>
              <th className="p-2">Subtítulo</th>
              <th className="p-2 cursor-pointer" onClick={() => handleSort('price')}>
                Precio
                {sortConfig.key === 'price' && (sortConfig.direction === 'ascending' ? <ChevronUpIcon className="h-4 w-4 inline" /> : <ChevronDownIcon className="h-4 w-4 inline" />)}
              </th>
              <th className="p-2 cursor-pointer" onClick={() => handleSort('category')}>
                Categoría
                {sortConfig.key === 'category' && (sortConfig.direction === 'ascending' ? <ChevronUpIcon className="h-4 w-4 inline" /> : <ChevronDownIcon className="h-4 w-4 inline" />)}
              </th>
              <th className="p-2 col-span-2">Colores</th>
              <th className="p-2">Imágenes</th>
              <th className="p-2">Tallas</th>
              <th className="p-2">Inventario</th>
              <th className="p-2">¿Tiene Tallas?</th>
              <th className="p-2">¿Tiene Colores?</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {editingProducts.map(product => (
              <tr key={product.id} className="text-center ">
                <td className="p-2"
                  contentEditable={!!editingRows[product.id]}
                  suppressContentEditableWarning
                  onBlur={(e) => handleCellUpdate(product.id, 'name', e.target.textContent)}
                >
                  {product.name}
                </td>
                <td className="p-2"
                  contentEditable={!!editingRows[product.id]}
                  suppressContentEditableWarning
                  onBlur={(e) => handleCellUpdate(product.id, 'subtitle', e.target.textContent)}
                >
                  {product.subtitle}
                </td>
                <td className="p-2"
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
                    <div className="flex">
                      {product.colors && product.colors.length > 0 ? (
                        product.colors.map((color, idx) => (
                          <span key={idx} className="inline-flex items-center mr-2">
                            <input
                              type="color"
                              value={color}
                              onChange={(e) => handleColorChange(product.id, idx, e.target.value)}
                              className="mr-1"
                            />
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">No colors</span>
                      )}
                      {extendedCategories.find(cat => cat.id === product.category)?.supportsColors && (
                        <button
                          onClick={() => handleAddColor(product.id)}
                          className="ml-2 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                        >
                          <PlusIcon className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ) : (
                    (product.colors && product.colors.length > 0) ? (
                      <div className="flex">
                        {product.colors.map((color, idx) => (
                          <div
                            key={idx}
                            style={{ backgroundColor: color, width: '1.5rem', height: '1.5rem', border: '1px solid #ccc', margin: '0 0.5rem' }}
                          />
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-500">Sin colores</span>
                    )
                  )}
                </td>
                <td className="p-2">
                  {editingRows[product.id] ? (
                    <>
                      <Droppable droppableId={`images-${product.id}`} type="images">
                        {(provided) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="mt-2 flex flex-wrap"
                          >
                            {product.images &&
                              product.images.length > 0 &&
                              product.images.map((imgSrc, idx) => (
                                <Draggable
                                  key={`image-${product.id}-${idx}`}
                                  draggableId={`image-${product.id}-${idx}`}
                                  index={idx}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="relative"
                                    >
                                      <img
                                        src={imgSrc}
                                        alt={`Product ${product.id} - ${idx}`}
                                        className="w-12 h-12 mr-1 mb-1 object-cover"
                                      />
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleRemoveImage(product.id, idx);
                                        }}
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                                        title="Eliminar Imagen"
                                      >
                                        <XMarkIcon className="h-3 w-3" />
                                      </button>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                      <input
                        type="file"
                        multiple
                        onChange={(e) => handleImageUpload(product.id, e)}
                      />
                    </>
                  ) : (
                    (product.images && product.images.length > 0) ? (
                      <div className="flex flex-wrap justify-center">
                        {product.images.map((imgSrc, idx) => (
                          <img
                            key={idx}
                            src={imgSrc}
                            alt={`Product ${product.id} - ${idx}`}
                            className="w-12 h-12 mr-1 mb-1 object-cover"
                          />
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-500">Sin imágenes</span>
                    )
                  )}
                </td>
                <td className="p-2">
                  {editingRows[product.id] ? (
                    <div className="mt-1">
                      {product.sizes && product.sizes.length > 0 ? (
                        product.sizes.map((size, idx) => (
                          <span key={idx} className="inline-flex items-center bg-gray-200 text-sm text-gray-800 rounded-full px-2 py-1 mr-1 mb-1">
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
                        ""
                      )}
                      <div className="mt-1">
                        <input
                          type="text"
                          value={newSizeInput[product.id] || ''}
                          onChange={(e) => setNewSizeInput({ ...newSizeInput, [product.id]: e.target.value })}
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
                    (product.sizes && product.sizes.length > 0) ? product.sizes.join(", ") : ""
                  )}
                </td>
                <td className="p-2"
                  contentEditable={!!editingRows[product.id]}
                  suppressContentEditableWarning
                  onBlur={(e) => handleCellUpdate(product.id, 'inventory', e.target.textContent)}
                >
                  {product.inventory !== null && product.inventory !== undefined ? product.inventory : ''}
                </td>
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={product.hasSize || false}
                    onChange={(e) => handleCellUpdate(product.id, 'hasSize', e.target.checked)}
                    disabled={!editingRows[product.id]}
                  />
                </td>
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={product.hasColor || false}
                    onChange={(e) => handleCellUpdate(product.id, 'hasColor', e.target.checked)}
                    disabled={!editingRows[product.id]}
                  />
                </td>
                <td className="p-2">
                  {editingRows[product.id] ? (
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleSaveProduct(product.id)}
                        className="bg-blue-500 text-white p-1 rounded  mr-2"
                      >
                        <CheckIcon className="h-5 w-5"/>
                      </button>
                      <button
                        onClick={() => cancelEditRow(product.id)}
                        className="bg-gray-500 text-white p-1 rounded hover:bg-gray-600"
                      >
                        <XMarkIcon className="h-5 w-5"/>
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <button
                        onClick={() => toggleEditRow(product.id)}
                        className="bg-blue-500 text-white p-1 rounded  mr-2"
                      >
                        <PencilIcon className="h-5 w-5"/>
                      </button>
                      <button
                        onClick={() => {
                          const updatedProducts = editingProducts.filter(p => p.id !== product.id);
                          updateProducts(updatedProducts);
                        }}
                        className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                      >
                        <TrashIcon className="h-5 w-5"/>
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DragDropContext>
  );
};

export default ProductTab;
