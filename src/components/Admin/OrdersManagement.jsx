import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { adminStateAtom } from '../../store/adminAtoms';
import ShipmentModal from './ShipmentModal';
import RefundModal from './RefundModal';

const OrdersManagement = () => {
  const [adminState, setAdminState] = useAtom(adminStateAtom);
  const orders = adminState.orders || [
    { id: 1, customer: "John Doe", status: "Pending", tracking: "", refundStatus: "None" },
    { id: 2, customer: "Jane Smith", status: "Shipped", tracking: "TRK123", refundStatus: "None" },
  ];
  const [shipmentModalOpen, setShipmentModalOpen] = useState(false);
  const [refundModalOpen, setRefundModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const openShipmentModal = (order) => {
    setSelectedOrder(order);
    setShipmentModalOpen(true);
  };

  const openRefundModal = (order) => {
    setSelectedOrder(order);
    setRefundModalOpen(true);
  };

  const handleShipmentUpdate = (tracking) => {
    const updatedOrders = orders.map(order =>
      order.id === selectedOrder.id ? { ...order, tracking, status: "Shipped" } : order
    );
    setAdminState(prev => ({ ...prev, orders: updatedOrders }));
    setShipmentModalOpen(false);
  };

  const handleRefundProcess = (refundStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === selectedOrder.id ? { ...order, refundStatus } : order
    );
    setAdminState(prev => ({ ...prev, orders: updatedOrders }));
    setRefundModalOpen(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Orders Management</h2>
      <table className="min-w-full bg-gray-700 rounded">
        <thead>
          <tr className="text-white">
            <th className="py-2 px-4">Order ID</th>
            <th className="py-2 px-4">Customer</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Tracking</th>
            <th className="py-2 px-4">Refund Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} className="text-gray-200">
              <td className="py-2 px-4">{order.id}</td>
              <td className="py-2 px-4">{order.customer}</td>
              <td className="py-2 px-4">{order.status}</td>
              <td className="py-2 px-4">{order.tracking || "N/A"}</td>
              <td className="py-2 px-4">{order.refundStatus}</td>
              <td className="py-2 px-4">
                <button onClick={() => openShipmentModal(order)} className="bg-blue-500 text-white px-2 py-1 m-1 rounded">
                  Manage Shipment
                </button>
                <button onClick={() => openRefundModal(order)} className="bg-yellow-500 text-white px-2 py-1 m-1 rounded">
                  Process Refund
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {shipmentModalOpen && selectedOrder && (
        <ShipmentModal
          modalOpen={shipmentModalOpen}
          order={selectedOrder}
          onClose={() => setShipmentModalOpen(false)}
          onSubmit={handleShipmentUpdate}
        />
      )}
      {refundModalOpen && selectedOrder && (
        <RefundModal
          modalOpen={refundModalOpen}
          order={selectedOrder}
          onClose={() => setRefundModalOpen(false)}
          onSubmit={handleRefundProcess}
        />
      )}
    </div>
  );
};

export default OrdersManagement;
