import React, { useState, useEffect } from 'react';

const ProductImageGallery = ({ image_urls }) => {
  const [mainImage, setMainImage] = useState(image_urls && image_urls.length > 0 ? image_urls[0] : null);

  useEffect(() => {
    if (image_urls && image_urls.length > 0) {
      setMainImage(image_urls[0]);
    }
  }, [image_urls]);

  const handleThumbnailClick = (imageUrl) => {
    setMainImage(imageUrl);
  };

  return (
    <div className="w-full">
      {/* Main Image */}
      <div className="mb-4">
        {mainImage ? (
          <img
            src={mainImage}
            alt="Main Product"
            className="w-full h-auto max-h-96 object-contain border-2 border-gray-200 rounded-lg"
          />
        ) : (
          <div className="w-full h-96 bg-gray-100 flex items-center justify-center rounded-lg">
            <p className="text-gray-500">No image available</p>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {image_urls && image_urls.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {image_urls.slice(1).map((imageUrl, index) => (
            <div
              key={index}
              className={`w-20 h-20 cursor-pointer border-2 rounded-lg ${
                mainImage === imageUrl ? 'border-blue-500' : 'border-gray-200'
              }`}
              onClick={() => handleThumbnailClick(imageUrl)}
            >
              <img
                src={imageUrl}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;