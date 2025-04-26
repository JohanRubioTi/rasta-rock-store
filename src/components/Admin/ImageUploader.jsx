import React from 'react';
import { useAtomValue } from 'jotai';
import { handleRemoveImageAtom } from '../../store/adminAtoms';
import useImageUploader from '../../hooks/useImageUploader';
const ImageUploader = ({ onUploadComplete }) => {
  const handleRemoveImage = useAtomValue(handleRemoveImageAtom);
  const { uploadProgress, isUploading, handleFileSelect, uploadFile } = useImageUploader();

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !onUploadComplete?.callback || !onUploadComplete?.productId) {
      console.log('Missing required params for upload');
      return;
    }

    console.log('Starting upload for product:', onUploadComplete.productId);
    // Maintain file reference directly without relying on state
    try {
      console.log('Calling uploadFile with productId:', onUploadComplete.productId);
      const imageUrl = await uploadFile(onUploadComplete.productId, file);
      console.log('Upload completed, image URL:', imageUrl);
      
      if (imageUrl) {
        console.log('Calling callback with image URL');
        onUploadComplete.callback(imageUrl);
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <div className="image-uploader">
      {isUploading && (
        <div className="upload-progress">
          <progress value={uploadProgress} max="100" />
          <span>{uploadProgress}%</span>
        </div>
      )}
      <input 
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
    </div>
  );
};

export default ImageUploader;
