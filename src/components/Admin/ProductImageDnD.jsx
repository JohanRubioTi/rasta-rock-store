import { Draggable } from 'react-beautiful-dnd';
import { XMarkIcon } from '@heroicons/react/24/outline';

const ProductImageDnD = ({ 
  images,
  productId,
  onRemoveImage
}) => {
  console.log(images);
  return (
    <div className="flex flex-wrap gap-2">
      {images.map((image, index) => (
        <Draggable key={image.id} draggableId={String(image.id)} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div className="relative group">
                <img
                  src={image.url}
                  alt={`Preview ${index}`}
                  className="w-8 h-8 object-cover rounded border border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => onRemoveImage(productId, image.id)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <XMarkIcon className="h-3 w-3" />
                </button>
              </div>
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
};

export default ProductImageDnD;
