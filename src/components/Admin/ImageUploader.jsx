import React, { useState } from 'react';

const ImageUploader = ({ onImageSelect }) => {
  const [imageUrl, setImageUrl] = useState('');

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imgFile = e.target.files[0];
      setImageUrl(URL.createObjectURL(imgFile));
      onImageSelect(imgFile); // Pass the selected file to parent
    } else {
      setImageUrl('');
      onImageSelect(null);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {imageUrl && (
        <div className="mt-2">
          <img src={imageUrl} alt="Preview" className="w-32 h-32 object-cover rounded" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
