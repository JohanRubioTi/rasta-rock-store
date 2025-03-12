import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { adminStateAtom } from '../../store/adminAtoms';
import TabNavigation from './TabNavigation';
import ProductTab from './ProductTab';
import CategoryTab from './CategoryTab';
import OrdersTab from './OrdersTab';
import RefundsTab from './RefundsTab';

const AdminDashboard = () => {
  const [adminState, setAdminState] = useAtom(adminStateAtom);
  const [activeTab, setActiveTab] = useState("Productos");

  useEffect(() => {
    if (!adminState.orders || !adminState.orders.length) {
      setAdminState(prev => ({
        ...prev,
        orders: [
          { id: 1, customer: "Juan Pérez", status: "Pendiente", tracking: "", refundStatus: "Ninguno" },
          { id: 2, customer: "María Gómez", status: "Enviado", tracking: "TRK123", refundStatus: "Ninguno" }
        ]
      }));
    }
  }, []);

  return (
    <div className="min-h-screen w-full p-4" style={{
      background: "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(34,139,34,0.1) 70%, rgba(255,255,0,0.1) 72%, rgba(255,0,0,0.1) 74%, rgba(0,0,0,0.7) 75%, rgba(0,0,0,0.7) 100%)",
      animation: "gradient-shift 150s linear infinite",
      backgroundSize: "200% 100%",
      background: "linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(34,139,34,0.2) 70%, rgba(255,255,0,0.2) 72%, rgba(255,0,0,0.2) 74%, rgba(0,0,0,0.8) 75%, rgba(0,0,0,0.8) 100%)"
    }}>
      <h1 className="text-3xl font-bold mb-4 text-white">Panel de Administración</h1>
      <TabNavigation activeTab={activeTab} onChange={setActiveTab} />
      {activeTab === "Productos" && (
        <ProductTab 
          products={adminState.products || []} 
          onUpdateProducts={newProducts => setAdminState(prev => ({ ...prev, products: newProducts }))} 
        />
      )}
      {activeTab === "Categorías" && (
        <CategoryTab 
          categories={adminState.categories || []} 
          onUpdateCategories={newCategories => setAdminState(prev => ({ ...prev, categories: newCategories }))} 
        />
      )}
      {activeTab === "Pedidos" && <OrdersTab orders={adminState.orders || []} />}
      {activeTab === "Reembolsos" && <RefundsTab orders={adminState.orders || []} />}
    </div>
  );
};

export default AdminDashboard;
