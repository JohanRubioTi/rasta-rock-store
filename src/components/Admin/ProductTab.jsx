import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { adminStateAtom } from '../../store/adminAtoms';
import { PencilIcon, CheckIcon, XMarkIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

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
    // Revert product in editingProducts to the value in adminState.products.
    const originalProduct = adminState.products.find(p => p.id === productId);
    const updatedProducts = editingProducts.map(product =>
      product.id === productId ? (originalProduct || product) : product
    );
    updateProducts(updatedProducts);
    setEditingRows(prev => ({ ...prev, [productId]: false }));
    setNewSizeInput(prev => ({ ...prev, [productId]: "" }));
  };

  const handleCellUpdate = (productId, field, newValue) => {
    const updatedProducts = editingProducts.map(product => {
      if (product.id === productId) {
        let updatedValue = newValue;
        if (field === 'price') {
          updatedValue = Number(newValue);
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
      name: 'Nuevo Producto',
      subtitle: '',
      description: '',
      price: 0,
      images: [], // support multiple images
      category: defaultCategory,
      colors: categoryInfo && categoryInfo.supportsColors ? [] : null,
      sizes: categoryInfo && categoryInfo.supportsSizes ? [] : null,
      details: '',
      specifications: ''
    };
    const updatedProducts = [...editingProducts, newProduct];
    updateProducts(updatedProducts);
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

  // Handle file upload for images. Accepts multiple files.
  const handleImageUpload = (productId, event) => {
    const files = Array.from(event.target.files);
    const fileURLs = files.map(file => URL.createObjectURL(file));
    const updatedProducts = editingProducts.map(product => {
      if (product.id === productId) {
        return { ...product, images: fileURLs };
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

  return (
    <div className="admin-table-card p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-2 text-white">Productos</h2>
      <button 
        onClick={handleAddProduct} 
        className="bg-white text-gray-800 px-4 py-2 rounded hover:bg-gray-300 mb-4"
      >
        Agregar Producto
      </button>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Subtítulo</th>
            <th className="p-2 border">Precio</th>
            <th className="p-2 border">Categoría</th>
            <th className="p-2 border">Colores</th>
            <th className="p-2 border">Imágenes</th>
            <th className="p-2 border">Tallas</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {editingProducts.map(product => (
            <tr key={product.id} className="text-center border">
              <td className="p-2 border">{product.id}</td>
              <td className="p-2 border"
                contentEditable={!!editingRows[product.id]}
                suppressContentEditableWarning
                onBlur={(e) => handleCellUpdate(product.id, 'name', e.target.textContent)}
              >
                {product.name}
              </td>
              <td className="p-2 border"
                contentEditable={!!editingRows[product.id]}
                suppressContentEditableWarning
                onBlur={(e) => handleCellUpdate(product.id, 'subtitle', e.target.textContent)}
              >
                {product.subtitle}
              </td>
              <td className="p-2 border"
                contentEditable={!!editingRows[product.id]}
                suppressContentEditableWarning
                onBlur={(e) => handleCellUpdate(product.id, 'price', e.target.textContent)}
              >
                {product.price}
              </td>
              <td className="p-2 border">
                {editingRows[product.id] ? (
                  <select
                    value={product.category}
                    onChange={(e) => handleSelectChange(product.id, e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 bg-white text-black"
                    style={{ minWidth: '150px' }}
                  >
                    <option value="">Seleccione</option>
                    {extendedCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  extendedCategories.find(cat => cat.id === product.category)?.name || product.category
                )}
              </td>
              <td className="p-2 border">
                {editingRows[product.id] ? (
                  <div>
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
                  product.colors && product.colors.join(", ")
                )}
              </td>
              <td className="p-2 border">
                {editingRows[product.id] ? (
                  <div>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => handleImageUpload(product.id, e)}
                      className="mb-2"
                    />
                    {product.images && product.images.length > 0 && (
                      <div className="mt-2 flex flex-wrap">
                        {product.images.map((imgSrc, idx) => (
                          <img
                            key={idx}
                            src={imgSrc}
                            alt={`Product ${product.id} - ${idx}`}
                            className="w-12 h-12 mr-1 mb-1 object-cover"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  product.images && product.images.length > 0 ? (
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
                    <span className="text-gray-500">No images</span>
                  )
                )}
              </td>
              <td className="p-2 border">
                {editingRows[product.id] ? (
                  // Sizes handled as tags.
                  <div>
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
                      <span className="text-gray-500">No sizes</span>
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
                  product.sizes && product.sizes.join(", ")
                )}
              </td>
              <td className="p-2 border">
                {editingRows[product.id] ? (
                  <div className="flex justify-center">
                    <button
                      onClick={() => toggleEditRow(product.id)}
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
  );
};

export default ProductTab;
