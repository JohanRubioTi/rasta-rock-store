import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { adminStateAtom } from '../../store/adminAtoms';
import ProductModal from './ProductModal';
import CategoryModal from './CategoryModal';
import OrdersManagement from './OrdersManagement';

const AdminDashboard = () => {
  const [adminState, setAdminState] = useAtom(adminStateAtom);
  const productos = adminState.products || [];
  const categorias = adminState.categories || [];
  const pedidos = adminState.orders || [];
  useEffect(() => {
    if (!adminState.orders || adminState.orders.length === 0) {
      setAdminState(prev => ({ 
        ...prev, 
        orders: [
          { id: 1, customer: "Juan Pérez", status: "Pendiente", tracking: "", refundStatus: "Ninguno" },
          { id: 2, customer: "María Gómez", status: "Enviado", tracking: "TRK123", refundStatus: "Ninguno" }
        ]
      }));
    }
  }, []);
  // Tabs state: "Productos", "Categorías", "Pedidos", "Reembolsos"
  const [activeTab, setActiveTab] = useState("Productos");

  // Category Modal state
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
      updatedCategorias = categorias.map(cat =>
        cat.id === categoryFormData.id ? { ...categoryFormData } : cat
      );
    } else {
      const newId = categorias.length > 0 ? Math.max(...categorias.map(c => Number(c.id))) + 1 : 1;
      const newCategory = { ...categoryFormData, id: newId };
      updatedCategorias = [...categorias, newCategory];
    }
    setAdminState(prev => ({ ...prev, categories: updatedCategorias }));
    setCategoryModalOpen(false);
  };

  // Product Modal state
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
      updatedProductos = productos.map(prod =>
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
      const newId = productos.length > 0 ? Math.max(...productos.map(p => Number(p.id))) + 1 : 1;
      const newProduct = {
        ...formData,
        id: newId,
        price: Number(formData.price),
        images: formData.images.split(',').map(img => img.trim()),
        colors: formData.colors.split(',').map(color => color.trim()),
        specifications: formData.specifications ? JSON.parse(formData.specifications) : {}
      };
      updatedProductos = [...productos, newProduct];
    }
    setAdminState(prev => ({ ...prev, products: updatedProductos }));
    setModalOpen(false);
  };

  // Reembolsos: extract orders with refundStatus not equal to "Ninguno"
  const reembolsos = pedidos.filter(pedido => pedido.refundStatus && pedido.refundStatus !== "Ninguno");

  return (
    <div className="min-h-screen w-full p-4 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 animate-gradient-slow">
      <h1 className="text-3xl font-bold mb-4 text-white">Panel de Administración</h1>
      {/* Navegación por pestañas */}
      <div className="flex space-x-4 mb-4 border-b border-gray-500">
        {["Productos", "Categorías", "Pedidos", "Reembolsos"].map(pestaña => (
          <button
            key={pestaña}
            onClick={() => setActiveTab(pestaña)}
            className={`py-2 px-4 ${
              activeTab === pestaña ? "border-b-2 border-white text-white font-bold" : "text-gray-300"
            }`}
          >
            {pestaña}
          </button>
        ))}
      </div>
      {/* Contenido de cada pestaña */}
      {activeTab === "Productos" && (
        <div className="rasta-card-gradient rasta-card-frame p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2 text-white">Productos</h2>
          <button onClick={openAddModal} className="bg-white text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
            Agregar Producto
          </button>
          <ul className="mt-2 text-white">
            {productos.map(producto => (
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
      )}
      {activeTab === "Categorías" && (
        <div className="rasta-card-gradient rasta-card-frame p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2 text-white">Categorías</h2>
          <button onClick={openAddCategoryModal} className="bg-white text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
            Agregar Categoría
          </button>
          <ul className="mt-2 text-white">
            {categorias.map(categoria => (
              <li key={categoria.id} className="mb-1">
                {categoria.name} -{' '}
                <button onClick={() => openEditCategoryModal(categoria)} className="text-blue-200 hover:underline">
                  Editar
                </button>
              </li>
            ))}
          </ul>
          <CategoryModal
            modalOpen={categoryModalOpen}
            categoryFormData={categoryFormData}
            handleCategoryInputChange={handleCategoryInputChange}
            handleCategorySubmit={handleCategorySubmit}
            onClose={() => setCategoryModalOpen(false)}
          />
        </div>
      )}
      {activeTab === "Pedidos" && (
        <div className="rasta-card-gradient rasta-card-frame p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2 text-white">Pedidos</h2>
          <ul className="text-white">
            {pedidos.map(pedido => (
              <li key={pedido.id} className="mb-1">
                Pedido #{pedido.id} - Estado: {pedido.status}
              </li>
            ))}
          </ul>
        </div>
      )}
      {activeTab === "Reembolsos" && (
        <div className="rasta-card-gradient rasta-card-frame p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2 text-white">Reembolsos</h2>
          {reembolsos.length > 0 ? (
            <ul className="text-white">
              {reembolsos.map(reembolso => (
                <li key={reembolso.id} className="mb-1">
                  Pedido #{reembolso.id} - Estado de Reembolso: {reembolso.refundStatus}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-300">No hay solicitudes de reembolso disponibles.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
