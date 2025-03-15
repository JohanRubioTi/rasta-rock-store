import React from 'react';

const CategoryModal = ({ modalOpen, categoryFormData, handleCategoryInputChange, handleCategorySubmit, onClose }) => {
  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="rasta-card-gradient rasta-card-frame p-6 rounded-lg w-full max-w-lg mx-auto">
        <h2 className="text-2xl mb-4">
          {categoryFormData.id ? 'Editar Categoría' : 'Agregar Categoría'}
        </h2>
        <form onSubmit={handleCategorySubmit} className="space-y-4">
          <div>
            <label className="block text-white">Nombre</label>
            <input
              type="text"
              name="name"
              value={categoryFormData.name}
              onChange={handleCategoryInputChange}
              className="w-full p-2 rounded"
              required
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

export default CategoryModal;
