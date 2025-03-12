import React from 'react';

const ProductModal = ({ modalOpen, isEditing, formData, handleInputChange, handleSubmit, onClose }) => {
  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rasta-card-gradient rasta-card-frame p-6 rounded-lg w-full max-w-lg mx-auto">
        <h2 className="text-2xl mb-4">{isEditing ? 'Edit Product' : 'Add Product'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-white">Subtitle</label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
              className="w-full p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-white">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-white">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-white">Images (comma separated URLs)</label>
            <input
              type="text"
              name="images"
              value={formData.images}
              onChange={handleInputChange}
              className="w-full p-2 rounded"
            />
          </div>
          {formData.images && formData.images.trim() !== '' && (() => {
              const previewUrl = formData.images.split(',')[0].trim();
              const validUrl = (previewUrl.startsWith("http://") || previewUrl.startsWith("https://")) ? previewUrl : "https://placehold.co/400";
              return (
                <div className="mt-2">
                  <img 
                    src={validUrl}
                    alt="Product preview"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400"; }}
                    className="w-full h-auto rounded"
                  />
                </div>
              );
            })()}
          <div>
            <label className="block text-white">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-white">Colors (comma separated)</label>
            <input
              type="text"
              name="colors"
              value={formData.colors}
              onChange={handleInputChange}
              className="w-full p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-white">Has Sizes</label>
            <input
              type="checkbox"
              name="hasSizes"
              checked={formData.hasSizes}
              onChange={handleInputChange}
              className="mr-2"
            />
          </div>
          <div>
            <label className="block text-white">Details</label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleInputChange}
              className="w-full p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-white">Specifications (JSON format)</label>
            <textarea
              name="specifications"
              value={formData.specifications}
              onChange={handleInputChange}
              className="w-full p-2 rounded"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-rastaGreen text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
