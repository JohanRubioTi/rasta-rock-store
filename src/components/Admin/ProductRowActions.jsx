import {
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

const ProductRowActions = ({
  isEditing,
  productId,
  onEdit,
  onSave,
  onCancel,
  onDelete
}) => {
  return isEditing ? (
    <div className="flex justify-center">
      <button
        onClick={onSave}
        className="bg-blue-500 text-white p-1 rounded mr-2"
      >
        <CheckIcon className="h-5 w-5" />
      </button>
      <button
        onClick={onCancel}
        className="bg-gray-500 text-white p-1 rounded hover:bg-gray-600"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  ) : (
    <div className="flex justify-center">
      <button
        onClick={onEdit}
        className="bg-blue-500 text-white p-1 rounded mr-2"
      >
        <PencilIcon className="h-5 w-5" />
      </button>
      <button
        onClick={onDelete}
        className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ProductRowActions;
