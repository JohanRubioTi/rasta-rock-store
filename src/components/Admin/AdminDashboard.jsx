import React, { useState } from 'react';
import TabNavigation from './TabNavigation';
import ProductTab from './ProductTab';
import CategoryTab from './CategoryTab';
import OrdersTab from './OrdersTab';
import RefundsTab from './RefundsTab';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Productos");
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error);
      alert('Error logging out');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen w-full p-4 bg-gradient-to-r from-green-900 via-yellow-900 to-green-900 animate-gradient-x">
      <h1 className="text-3xl font-bold mb-4 text-white flex justify-between items-center">
        Panel de Administración
        <button 
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Cerrar Sesión
        </button>
      </h1>
      <TabNavigation activeTab={activeTab} onChange={setActiveTab} />
      {activeTab === "Productos" && <ProductTab />}
      {activeTab === "Categorías" && <CategoryTab />}
      {activeTab === "Pedidos" && <OrdersTab />}
      {activeTab === "Reembolsos" && <RefundsTab />}
    </div>
  );
};

export default AdminDashboard;
