import { useState } from 'react';
import { useAtom } from 'jotai';
import { supabase } from '../../../supabaseClient';
import { uploadProgressAtom } from '../../../store/adminAtoms';

export default function useImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useAtom(uploadProgressAtom);

  const handleFileSelect = (file) => {
    console.log('File selected:', file?.name);
    setSelectedFile(file);
  };

  const uploadFile = async (productId, file) => {
    if (!file) {
      console.log('No file provided for upload');
      return null;
    }

    console.log('Starting upload for product:', productId);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      console.log('Uploading file:', file.name);
      const fileExt = file.name.split('.').pop();
      const fileName = `product_${productId}_${Date.now()}.${fileExt}`;
      const filePath = `products/${productId}/${fileName}`;
      
      console.log('Uploading file:', fileName, 'to path:', filePath);

      // Upload to storage
      const { data, error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          onUploadProgress: (progress) => {
            const percent = Math.round((progress.loaded * 100) / progress.total);
            console.log('Upload progress:', percent + '%');
            setUploadProgress(percent);
          },
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      console.log('Upload successful, getting public URL');
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      console.log('Public URL:', publicUrl);
      return publicUrl;
    } catch (error) {
      console.error('Upload failed:', error);
      return null;
    } finally {
      setIsUploading(false);
      setSelectedFile(null);
      setUploadProgress(0);
    }
  };

  return {
    selectedFile,
    isUploading,
    uploadProgress,
    handleFileSelect,
    uploadFile,
    reset: () => {
      setSelectedFile(null);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };
}
