import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { PencilIcon, TrashIcon, PlusIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const CategoryTab = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategories, setEditingCategories] = useState([]);
  const [editingRows, setEditingRows] = useState({});
  const [newCategoryIds, setNewCategoryIds] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('categories').select('*');
      if (error) {
       
      } else {
        setCategories(data);
        setEditingCategories(data);
      }
    };

    fetchCategories();
  }, []);

  const updateCategories = (updatedCategories) => {
    setEditingCategories(updatedCategories);
    setCategories(updatedCategories.map(ec => {
      const originalCategory = categories.find(c => c.id === ec.id);
      return originalCategory ? { ...originalCategory, ...ec } : ec;
    }));
  };

  const toggleEditRow = (categoryId) => {
    setEditingRows(prev => ({ ...prev, [categoryId]: !prev[categoryId] }));
  };

  const handleCellUpdate = (categoryId, field, newValue) => {
    const updatedCategories = editingCategories.map(category => {
      if (category.id === categoryId) {
        return { ...category, [field]: newValue };
      }
      return category;
    });
    updateCategories(updatedCategories);
  };

  const handleAddCategory = async () => {
    const newId =
      editingCategories.length > 0
        ? String(Math.max(...editingCategories.map(c => Number(c.id))) + 1)
        : "1";

    const newCategory = { id: newId, name: '', description: '' };

    setEditingCategories(prev => [...prev, newCategory]);
    setEditingRows(prev => ({ ...prev, [newId]: true }));
    setNewCategoryIds(prev => [...prev, newId]);
    // Also add to categories for immediate UI update
    setCategories(prev => [...prev, newCategory]);
  };

  const handleSaveCategory = async (categoryId) => {
      const categoryToSave = editingCategories.find(c => c.id === categoryId);
      const isNewCategory = newCategoryIds.includes(categoryId);

      try {
        if (isNewCategory) {
          const { data, error } = await supabase.from('categories').insert([categoryToSave]).select();
          if (error) throw error;

          setCategories(prevCategories => {
            const updatedCategories = prevCategories.map(c => (c.id === categoryId ? data[0] : c));
            return updatedCategories;
          });
          setNewCategoryIds(prev => prev.filter(id => id !== categoryId));
        } else {
          const { error } = await supabase.from('categories').update(categoryToSave).eq('id', categoryId);
          if (error) throw error;
          setCategories(prevCategories =>
            prevCategories.map(c => (c.id === categoryId ? { ...c, ...categoryToSave } : c))
          );
        }
        setEditingCategories(prevCategories =>
          prevCategories.map(c => (c.id === categoryId ? { ...c, ...categoryToSave } : c))
        );
        setEditingRows(prev => ({ ...prev, [categoryId]: false }));
      } catch (error) {
        
        alert('Error saving category: ' + error.message);
      }
    };

    const cancelEditRow = (categoryId) => {
      const isNewCategory = newCategoryIds.includes(categoryId);

      if (isNewCategory) {
        setEditingCategories(prev => prev.filter(c => c.id !== categoryId));
        setCategories(prev => prev.filter(c => c.id !== categoryId));
        setNewCategoryIds(prevIds => prevIds.filter(id => id !== categoryId));
      } else {
        const originalCategory = categories.find(c => c.id === categoryId);
        if (originalCategory) {
          setEditingCategories(prev =>
            prev.map(category => (category.id === categoryId ? originalCategory : category))
          );
        }
      }

      setEditingRows(prev => ({ ...prev, [categoryId]: false }));
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
                {editingRows[category.id] ? (
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleSaveCategory(category.id)}
                        className="bg-blue-500 text-white p-1 rounded  mr-2"
                      >
                        <CheckIcon className="h-5 w-5"/>
                      </button>
                      <button
                        onClick={() => cancelEditRow(category.id)}
                        className="bg-gray-500 text-white p-1 rounded hover:bg-gray-600"
                      >
                        <XMarkIcon className="h-5 w-5"/>
                      </button>
                    </div>
                  ) : (
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
                      updateCategories(updated);
                    }}
                    className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTab;
