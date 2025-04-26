import SmallImagePreview from '../Admin/SmallImagePreview';
import { useState } from 'react';

export default function ProductImageGallery({ imageUrls }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-wrap justify-center">
      {expanded
        ? imageUrls.map((imageUrl, index) => (
            <SmallImagePreview key={index} imageUrl={imageUrl} />
          ))
        : imageUrls.slice(0, 3).map((imageUrl, index) => (
            <SmallImagePreview 
              key={index} 
              imageUrl={imageUrl} 
              className="w-8 h-8"
            />
          ))
      }
      {imageUrls.length > 3 && !expanded && (
        <button
          className="text-blue-500 text-sm ml-1"
          onClick={() => setExpanded(true)}
        >
          +{imageUrls.length - 3} more
        </button>
      )}
    </div>
  );
}