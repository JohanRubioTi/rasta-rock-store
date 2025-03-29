import { useState, useCallback, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import { useSetAtom } from 'jotai';
import { handleRemoveImageAtom } from '../../../store/adminAtoms';

const useProductSaver = (
  editingProducts,
  updateLocalProducts,
  setOriginalProducts,
  setEditingProducts,
  setEditingRows,
  fetchProducts,
  newProductIds,
  setNewProductIds
) => {
  const [deletingImage, setDeletingImage] = useState(null);
  const [savingProduct, setSavingProduct] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const setHandleRemoveImageAtom = useSetAtom(handleRemoveImageAtom);

  const validateProduct = (product) => {
    if (!product.name?.trim()) {
      alert("Product name is required");
      return false;
    }
    if (!product.price || product.price <= 0) {
      alert("Price must be greater than zero");
      return false;
    }
    return true;
  };

  const handleRemoveImage = useCallback((productId, imageUrl) => async () => {
    if (!window.confirm('Delete this image?')) return;
    
    setDeletingImage(imageUrl);
    try {
      const filePath = imageUrl.split('/product-images/')[1];
      if (!filePath) throw new Error("Invalid image URL");

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('product-images')
        .remove([filePath]);
      if (storageError) throw storageError;

      // Update database
      const { error: rpcError } = await supabase.rpc('remove_image_from_product', {
        product_id: productId,
        image_url_to_remove: imageUrl
      });
      if (rpcError) throw rpcError;

      // Update local state
      const updatedProducts = editingProducts.map(product => 
        product.id === productId ? {
          ...product,
          image_urls: product.image_urls.filter(url => url !== imageUrl)
        } : product
      );
      updateLocalProducts(updatedProducts);

    } catch (error) {
      alert(`Error deleting image: ${error.message}`);
    } finally {
      setDeletingImage(null);
    }
  }, [editingProducts, updateLocalProducts]);

  useEffect(() => {
    setHandleRemoveImageAtom(() => handleRemoveImage);
  }, [handleRemoveImage, setHandleRemoveImageAtom]);

  const handleImageUpload = useCallback(async (productId, event) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;

    setUploadingImage(true);
    try {
      const uploadedUrls = await Promise.all(
        files.map(async (file) => {
          const fileExt = file.name.split('.').pop();
          const fileName = `${productId}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${fileExt}`;
          const filePath = `${productId}/${fileName}`;

          const { error } = await supabase.storage
            .from('product-images')
            .upload(filePath, file, { cacheControl: '3600' });
          if (error) throw error;

          const { data: urlData } = await supabase.storage
            .from('product-images')
            .getPublicUrl(filePath);
          
          return urlData.publicUrl;
        })
      );

      const updatedProducts = editingProducts.map(product => 
        product.id === productId ? {
          ...product,
          image_urls: [...(product.image_urls || []), ...uploadedUrls]
        } : product
      );
      updateLocalProducts(updatedProducts);

    } catch (error) {
      alert(`Image upload failed: ${error.message}`);
    } finally {
      setUploadingImage(false);
    }
  }, [editingProducts, updateLocalProducts]);

  const handleSaveProduct = useCallback(async (productId) => {
    const product = editingProducts.find(p => p.id === productId);
    if (!product || !validateProduct(product)) return;

    setSavingProduct(true);
    try {
      const isNew = newProductIds.includes(productId);
      const { id, ...data } = product;

      let savedData;
      if (isNew) {
        const { data: newData, error } = await supabase
          .from('products')
          .insert(data)
          .select()
          .single();
        if (error) throw error;
        savedData = newData;

        setNewProductIds(prev => prev.filter(nid => nid !== productId));
        setEditingProducts(prev => prev.map(p => p.id === productId ? savedData : p));
      } else {
        const { data: updatedData, error } = await supabase
          .from('products')
          .update(data)
          .eq('id', productId)
          .select()
          .single();
        if (error) throw error;
        savedData = updatedData;
      }

      setOriginalProducts(prev => prev.map(p => p.id === productId ? savedData : p));
      setEditingRows(prev => ({ ...prev, [savedData.id]: false }));

    } catch (error) {
      alert(`Save failed: ${error.message}`);
    } finally {
      setSavingProduct(false);
    }
  }, [editingProducts, newProductIds, setOriginalProducts, setEditingProducts, setNewProductIds, setEditingRows]);

  return {
    handleSaveProduct,
    handleRemoveImage,
    handleImageUpload,
    deletingImage,
    savingProduct,
    uploadingImage
  };
};

export default useProductSaver;
