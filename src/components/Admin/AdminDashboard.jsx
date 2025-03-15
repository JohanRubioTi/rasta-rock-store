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
        ],
      }));
    }
  }, []);

  return (
    <div className="min-h-screen w-full p-4 bg-gradient-to-r from-green-900 via-yellow-900 to-green-900 animate-gradient-x">
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
      {activeTab === "Reembolsos" && <RefundsTab refunds={adminState.refunds || []} onUpdateRefunds={newRefunds => setAdminState(prev => ({ ...prev, refunds: newRefunds }))} />}
    </div>
  );
};

export default AdminDashboard;
