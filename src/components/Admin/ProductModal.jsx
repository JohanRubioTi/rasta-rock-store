import React, { useState } from 'react';

const ProductModal = ({ modalOpen, isEditing, formData, setFormData, handleSubmit, onClose }) => {
  if (!modalOpen) return null;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rasta-card-gradient rasta-card-frame p-6 rounded-lg w-full max-w-lg mx-auto">
        <h2 className="text-2xl mb-4">{isEditing ? 'Editar Producto' : 'Agregar Producto'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white">Nombre</label>
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
            <label className="block text-white">Subtítulo</label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
              className="w-full p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-white">Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-white">Precio</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-2 rounded"
              required
            />
          </div>
          
          {formData.images && (() => (
              <div className="mt-2">
                <img 
                  src={formData.images}
                  alt="Vista previa del producto"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400"; }}
                  className="w-full h-auto rounded"
                />
              </div>
            ))()}
          <div>
            <label className="block text-white">Categoría</label>
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
            <label className="block text-white">Colores (separados por comas)</label>
            <input
              type="text"
              name="colors"
              value={formData.colors}
              onChange={handleInputChange}
              className="w-full p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-white">Tiene Tallas</label>
            <input
              type="checkbox"
              name="hasSizes"
              checked={formData.hasSizes}
              onChange={handleInputChange}
              className="mr-2"
            />
          </div>
          <div>
            <label className="block text-white">Detalles</label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleInputChange}
              className="w-full p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-white">Especificaciones (formato JSON)</label>
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
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-rastaGreen text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
