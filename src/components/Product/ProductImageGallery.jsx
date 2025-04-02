import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const ProductImageGallery = ({ 
  images, 
  selectedImage, 
  onImageClick,
  onNextImage,
  onPrevImage,
  placeholderImage = 'https://placehold.co/400'
}) => {
  return (
    <div className="md:w-1/2 md:pr-6 flex flex-col items-center">
      {/* Main Image */}
      <div className="relative w-full" style={{ paddingTop: '100%' }}>
        <img
          src={images?.[selectedImage] || placeholderImage}
          alt="Product"
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = placeholderImage;
          }}
        />
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full md:hover:bg-opacity-75 focus:outline-none"
          onClick={onPrevImage}
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full md:hover:bg-opacity-75 focus:outline-none"
          onClick={onNextImage}
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex space-x-2 mt-2">
        {images?.map((image, index) => (
          <img
            key={index}
            src={image || placeholderImage}
            alt={`Thumbnail ${index + 1}`}
            className={`w-16 h-16 object-cover rounded-md cursor-pointer md:hover:opacity-75 transition duration-300 ${
              selectedImage === index ? 'ring-2 ring-rastaGreen' : ''
            }`}
            onClick={() => onImageClick(index)}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = placeholderImage;
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
