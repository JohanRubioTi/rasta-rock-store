import { supabase } from './supabaseClient';

export const imageService = {
  async uploadImage(file, productId, onProgress) {
    if (!file) throw new Error('No file provided');
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${productId}-${Date.now()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    try {
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          onProgress
        });

      if (error) throw error;
      return this.getPublicUrl(filePath);
    } catch (error) {
      console.error('Image upload failed:', error);
      throw new Error('Failed to upload image');
    }
  },

  async deleteImage(imageUrl) {
    try {
      const path = this.extractPathFromUrl(imageUrl);
      const { error } = await supabase.storage
        .from('product-images')
        .remove([path]);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Image deletion failed:', error);
      throw new Error('Failed to delete image');
    }
  },

  getPublicUrl(path) {
    return `${supabase.storageUrl}/object/public/product-images/${path}`;
  },

  extractPathFromUrl(url) {
    const basePath = '/object/public/product-images/';
    const index = url.indexOf(basePath);
    return index !== -1 ? url.slice(index + basePath.length) : '';
  }
};
