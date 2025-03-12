import React, { useState } from 'react';

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
    <div className="admin-table-card p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-2 text-white">Categorías</h2>
      <button
        onClick={handleAddCategory}
        className="bg-white text-gray-800 px-4 py-2 rounded hover:bg-gray-300 mb-4"
      >
        Agregar Categoría
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {editingCategories.map(category => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td
                contentEditable={!!editingRows[category.id]}
                suppressContentEditableWarning
                onBlur={(e) => handleCellUpdate(category.id, 'name', e.target.textContent)}
              >
                {category.name}
              </td>
              <td
                contentEditable={!!editingRows[category.id]}
                suppressContentEditableWarning
                onBlur={(e) => handleCellUpdate(category.id, 'description', e.target.textContent)}
              >
                {category.description}
              </td>
              <td>
                <button
                  onClick={() => toggleEditRow(category.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-2"
                >
                  {editingRows[category.id] ? 'Guardar' : 'Editar'}
                </button>
                <button
                  onClick={() => {
                    const updated = editingCategories.filter(c => c.id !== category.id);
                    setEditingCategories(updated);
                    onUpdateCategories(updated);
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTab;
