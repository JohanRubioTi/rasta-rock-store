import React, { useState } from 'react';
import ProductModal from './ProductModal';

const ProductTab = ({ products, onUpdateProducts }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    subtitle: '',
    description: '',
    price: '',
    images: '',
    category: '',
    colors: '',
    hasSizes: false,
    details: '',
    specifications: ''
  });

  const openAddModal = () => {
    setIsEditing(false);
    setFormData({
      id: '',
      name: '',
      subtitle: '',
      description: '',
      price: '',
      images: '',
      category: '',
      colors: '',
      hasSizes: false,
      details: '',
      specifications: ''
    });
    setModalOpen(true);
  };

  const openEditModal = (producto) => {
    setIsEditing(true);
    setFormData({
      id: producto.id,
      name: producto.name,
      subtitle: producto.subtitle || '',
      description: producto.description,
      price: producto.price,
      images: Array.isArray(producto.images) ? producto.images.join(', ') : '',
      category: producto.category,
      colors: Array.isArray(producto.colors) ? producto.colors.join(', ') : '',
      hasSizes: producto.hasSizes,
      details: producto.details,
      specifications: producto.specifications ? JSON.stringify(producto.specifications, null, 2) : ''
    });
    setModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedProductos;
    if (isEditing) {
      updatedProductos = products.map(prod =>
        prod.id === formData.id
          ? {
              ...formData,
              id: formData.id,
              price: Number(formData.price),
              images: formData.images.split(',').map(img => img.trim()),
              colors: formData.colors.split(',').map(color => color.trim()),
              specifications: formData.specifications ? JSON.parse(formData.specifications) : {}
            }
          : prod
      );
    } else {
      const newId = products.length > 0 ? Math.max(...products.map(p => Number(p.id))) + 1 : 1;
      const newProduct = {
        ...formData,
        id: newId,
        price: Number(formData.price),
        images: formData.images.split(',').map(img => img.trim()),
        colors: formData.colors.split(',').map(color => color.trim()),
        specifications: formData.specifications ? JSON.parse(formData.specifications) : {}
      };
      updatedProductos = [...products, newProduct];
    }
    setModalOpen(false);
    onUpdateProducts(updatedProductos);
  };

  return (
    <div className="rasta-card-gradient rasta-card-frame p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-2 text-white">Productos</h2>
      <button onClick={openAddModal} className="bg-white text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
        Agregar Producto
      </button>
      <ul className="mt-2 text-white">
        {products.map(producto => (
          <li key={producto.id} className="mb-1">
            {producto.name} -{' '}
            <button onClick={() => openEditModal(producto)} className="text-blue-200 hover:underline">
              Editar
            </button>
          </li>
        ))}
      </ul>
      <ProductModal
        modalOpen={modalOpen}
        isEditing={isEditing}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default ProductTab;
