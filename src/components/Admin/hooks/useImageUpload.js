import { imageService } from '../../services/imageService';
import { useAtom } from 'jotai';
import { selectedImageFileAtom, uploadProgressAtom, isUploadingAtom } from '../../../store/adminAtoms';

export default function useImageUpload(productId) {
  const [selectedFile, setSelectedFile] = useAtom(selectedImageFileAtom);
  const [uploadProgress, setUploadProgress] = useAtom(uploadProgressAtom);
  const [isUploading, setIsUploading] = useAtom(isUploadingAtom);

  const uploadImage = async () => {
    if (!selectedFile) return null;
    
    setIsUploading(true);
    try {
      return await imageService.uploadImage(
        selectedFile,
        productId,
        (progress) => {
          setUploadProgress(progress.loaded / progress.total * 100);
        }
      );
    } catch (error) {
      console.error('Upload failed:', error);
      return null;
    } finally {
      setIsUploading(false);
      setSelectedFile(null);
    }
  };

  return {
    selectedFile,
    uploadProgress,
    isUploading,
    setSelectedFile,
    uploadImage
  };
}
