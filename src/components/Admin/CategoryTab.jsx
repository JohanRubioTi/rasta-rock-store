import React, { useState } from 'react';
import CategoryModal from './CategoryModal';

const CategoryTab = ({ categories, onUpdateCategories }) => {
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [categoryFormData, setCategoryFormData] = useState({ id: '', name: '' });

  const openAddCategoryModal = () => {
    setCategoryFormData({ id: '', name: '' });
    setCategoryModalOpen(true);
  };

  const openEditCategoryModal = (categoria) => {
    setCategoryFormData({ id: categoria.id, name: categoria.name });
    setCategoryModalOpen(true);
  };

  const handleCategoryInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    let updatedCategorias;
    if (categoryFormData.id) {
      updatedCategorias = categories.map(cat =>
        cat.id === categoryFormData.id ? { ...categoryFormData } : cat
      );
    } else {
      const newId = categories.length > 0 ? Math.max(...categories.map(c => Number(c.id))) + 1 : 1;
      const newCategory = { ...categoryFormData, id: newId };
      updatedCategorias = [...categories, newCategory];
    }
    setCategoryModalOpen(false);
    onUpdateCategories(updatedCategorias);
  };

  return (
    <div className="rasta-card-gradient rasta-card-frame p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-2 text-white">Categorías</h2>
      <button 
        onClick={openAddCategoryModal} 
        className="bg-white text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
      >
        Agregar Categoría
      </button>
      <ul className="mt-2 text-white">
        {categories.map(categoria => (
          <li key={categoria.id} className="mb-1">
            {categoria.name} -{' '}
            <button 
              onClick={() => openEditCategoryModal(categoria)} 
              className="text-blue-200 hover:underline"
            >
              Editar
            </button>
          </li>
        ))}
      </ul>
      <CategoryModal 
        modalOpen={categoryModalOpen}
        categoryFormData={categoryFormData}
        handleInputChange={handleCategoryInputChange}
        handleSubmit={handleCategorySubmit}
        onClose={() => setCategoryModalOpen(false)}
      />
    </div>
  );
};

export default CategoryTab;
