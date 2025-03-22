import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import ProductTable from './ProductTable';
import useProducts from '../../hooks/useProducts';

const ProductTab = () => {
  const { products, categories, loading, error, fetchProducts, setProducts, setCategories } = useProducts();
  const [editingProducts, setEditingProducts] = useState(products || []);
  const [editingRows, setEditingRows] = useState({});
  const [newProductIds, setNewProductIds] = useState([]);
  const [newSizeInput, setNewSizeInput] = useState({});

  useEffect(() => {
    setEditingProducts(products);
  }, [products]);

  const extendedCategories = categories.map((cat) => {
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

  const updateProducts = (updatedProducts) => {
    setEditingProducts(updatedProducts);
  };

  const toggleEditRow = (productId) => {
    setEditingRows((prev) => ({ ...prev, [productId]: !prev[productId] }));
    // Clear new size input when toggling edit off.
    if (editingRows[productId]) {
      setNewSizeInput((prev) => ({ ...prev, [productId]: '' }));
    }
  };

  const cancelEditRow = (productId) => {
    const isNewProduct = newProductIds.includes(productId);

    if (isNewProduct) {
      setEditingProducts((prev) => prev.filter((p) => p.id !== productId));
      setNewProductIds((prevIds) => prevIds.filter((id) => id !== productId));
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } else {
      const originalProduct = products.find((p) => p.id === productId);
      if (originalProduct) {
        setEditingProducts((prev) =>
          prev.map((product) => (product.id === productId ? originalProduct : product))
        );
      }
    }

    setEditingRows((prev) => ({ ...prev, [productId]: false }));
    setNewSizeInput((prev) => ({ ...prev, [productId]: '' }));
  };

  const handleCellUpdate = (productId, field, newValue) => {
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
          }
          return { ...product, [field]: updatedValue };
        }
        return product;
      })
    );
  };

  const handleSelectChange = (productId, value) => {
    const updatedProducts = editingProducts.map((product) => {
      if (product.id === productId) {
        return { ...product, category: value };
      }
      return product;
    });
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

  const handleRemoveImage = async (productId, imageUrl) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta imagen?')) return;

    try {
      // Extract file path from URL
      const filePath = imageUrl.split('/product-images/')[1];
      
      // Delete from Supabase storage
      const { error } = await supabase.storage
        .from('product-images')
        .remove([filePath]);

      if (error) throw error;

      // Update database
      const { error: rpcError } = await supabase.rpc('remove_image_from_product', {
        product_id: productId,
        image_url_to_remove: imageUrl
      });

      if (rpcError) throw rpcError;

      // Update local state
      const updatedProducts = editingProducts.map((product) => {
        if (product.id === productId) {
          const updatedImages = product.images.filter(url => url !== imageUrl);
          return { ...product, images: updatedImages };
        }
        return product;
      });
      
      updateProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Error al eliminar la imagen: ' + error.message);
    }
  };

  const handleImageUpload = async (productId, event) => {
    const files = Array.from(event.target.files);
    const uploadPromises = files.map(async (file) => {
      const filePath = `${productId}/${file.name}`;
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        console.error('Error uploading image:', error);
        throw error;
      }

      const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    });

    try {
      const uploadedImageUrls = await Promise.all(uploadPromises);
        const updatedProducts = editingProducts.map((product) => {
        if (product.id === productId) {
          const updatedImageUrls = [
            ...(product.images || []),
            ...uploadedImageUrls,
          ];
          return { ...product, images: updatedImageUrls };
        }
        return product;
      });

      updateProducts(updatedProducts);
    } catch (error) {
      console.error('Failed to upload images or update product:', error);
      alert('Failed to upload images or update product: ' + error.message);
    }
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
    if (!result.destination) return;
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

    const validateProduct = (product) => {
    if (!product.name.trim()) {
      alert("El nombre del producto no puede estar vacío.");
      return false;
    }
    if (product.price <= 0) {
      alert("El precio debe ser mayor que cero.");
      return false;
    }
    return true;
  };

 const handleSaveProduct = async (productId, imageFile) => {
    const productToSave = editingProducts.find(p => p.id === productId);

    if (!validateProduct(productToSave)) {
      return;
    }

    const isNewProduct = newProductIds.includes(productId);

    // Upload image if provided
    let imageUrl = null;
    if (imageFile) {
      try {
        const timestamp = Date.now();
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `product_image_${productId}_${timestamp}.${fileExt}`;
        const filePath = `public/${fileName}`;

        const { data, error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, imageFile, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        imageUrl = urlData.publicUrl;
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading image: ' + error.message);
        return;
      }
    }

    // Prepare product data
    const currentImages = productToSave.images || [];
    const updatedImages = imageUrl ? [...currentImages, imageUrl] : currentImages;

    const supabaseProductData = {
      ...productToSave,
      image_urls: updatedImages,
    };

    try {
      if (isNewProduct) {
        // For new products, insert as before
        const { data, error } = await supabase.from('products').insert([supabaseProductData]).select();
        if (error) throw error;

        const newProductId = data[0].id;

        if (data && data.length > 0) {
          setProducts((prevProducts) => [
            ...prevProducts,
            { ...productToSave, id: newProductId, images: updatedImages }, // Ensure 'images' is included
          ]);
          setEditingProducts((prevProducts) =>
            prevProducts.map((p) =>
              p.id === productId ? { ...productToSave, id: newProductId, images: updatedImages } : p
            )
          );
        }

        setNewProductIds((prev) => prev.filter((id) => id !== productId));
      } else {
        // For existing products, update all fields *except* image_urls using standard update
        const { error: updateError } = await supabase
          .from('products')
          .update(supabaseProductData)
          .eq('id', productId);
        if (updateError) throw updateError;

        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === productId ? { ...p, ...supabaseProductData, images: updatedImages } : p // Ensure images is included
          )
        );
      }

      setEditingProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === productId ? { ...p, ...productToSave, images: updatedImages } : p // Ensure images is included
        )
      );
      setEditingRows((prev) => ({ ...prev, [productId]: false }));
      await fetchProducts(); // This should be defined from useProducts hook
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product: ' + error.message);
    }
    
  };

  return (
    <ProductTable
      editingProducts={editingProducts}
      extendedCategories={extendedCategories}
      editingRows={editingRows}
      handleCellUpdate={handleCellUpdate}
      handleSelectChange={handleSelectChange}
      handleColorChange={handleColorChange}
      handleAddColor={handleAddColor}
      handleImageUpload={handleImageUpload}
      handleSizeAdd={handleSizeAdd}
      handleSizeRemove={handleSizeRemove}
      newSizeInput={newSizeInput}
      setNewSizeInput={setNewSizeInput}
      toggleEditRow={toggleEditRow}
      cancelEditRow={cancelEditRow}
      handleSaveProduct={handleSaveProduct}
      updateProducts={updateProducts}
      sortConfig={sortConfig}
      handleSort={handleSort}
      onDragEnd={onDragEnd}
      newProductIds={newProductIds}
    />
  );
};

export default ProductTab;
