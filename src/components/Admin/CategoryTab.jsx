import React, { useState } from 'react';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

const CategoryTab = ({ categories, onUpdateCategories }) => {
  const [editingCategories, setEditingCategories] = useState(categories);
  const [editingRows, setEditingRows] = useState({});

  const toggleEditRow = (categoryId) => {
    setEditingRows(prev => ({ ...prev, [categoryId]: !prev[categoryId] }));
  };

  const handleCellUpdate = (categoryId, field, newValue) => {
    const updated = editingCategories.map(category => {
      if (category.id === categoryId) {
        return { ...category, [field]: newValue };
      }
      return category;
    });
    setEditingCategories(updated);
    onUpdateCategories(updated);
  };

  const handleAddCategory = () => {
    const newId = editingCategories.length > 0 ? Math.max(...editingCategories.map(c => Number(c.id))) + 1 : 1;
    const newCategory = { id: newId, name: 'Nueva Categoría', description: '' };
    const updated = [...editingCategories, newCategory];
    setEditingCategories(updated);
    onUpdateCategories(updated);
  };

  return (
    <div className="bg-black bg-opacity-75 backdrop-blur-xl rasta p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-2 text-white">Categorías</h2>
      <button
        onClick={handleAddCategory}
        className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center mb-4"
      >
        <PlusIcon className="h-5 w-5 mr-2" /> Agregar Categoría
      </button>
      <table className="w-full">
        <thead>
          <tr className="bg-black bg-opacity-75 text-white">
            <th className="p-2">ID</th>
            <th className="p-2">Nombre</th>
            <th className="p-2">Descripción</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {editingCategories.map(category => (
            <tr key={category.id} className="text-center">
              <td className="p-2">{category.id}</td>
              <td className="p-2"
                contentEditable={!!editingRows[category.id]}
                suppressContentEditableWarning
                onBlur={(e) => handleCellUpdate(category.id, "name", e.target.textContent)}
              >
                {category.name}
              </td>
              <td className="p-2"
                contentEditable={!!editingRows[category.id]}
                suppressContentEditableWarning
                onBlur={(e) => handleCellUpdate(category.id, "description", e.target.textContent)}
              >
                {category.description}
              </td>
              <td className="p-2">
                <div className="flex justify-center">
                  <button
                    onClick={() => toggleEditRow(category.id)}
                    className="bg-blue-500 text-white p-1 rounded  mr-2"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {
                      const updated = editingCategories.filter(c => c.id !== category.id);
                      setEditingCategories(updated);
                      onUpdateCategories(updated);
                    }}
                    className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTab;
