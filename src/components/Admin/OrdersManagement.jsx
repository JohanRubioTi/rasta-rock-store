import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { adminStateAtom } from '../../store/adminAtoms';
import ShipmentModal from './ShipmentModal';
import RefundModal from './RefundModal';

const OrdersManagement = () => {
  const [adminState, setAdminState] = useAtom(adminStateAtom);
  const orders = adminState.orders || [
    { id: 1, customer: "Cliente", status: "Pendiente", tracking: "", refundStatus: "Ninguno" },
    { id: 2, customer: "Cliente", status: "Enviado", tracking: "TRK123", refundStatus: "Ninguno" },
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

  const handleShipmentUpdate = (trackingCode, trackingLink) => {
    const updatedOrders = orders.map((order) =>
      order.id === selectedOrder.id
        ? {
            ...order,
            shipment: { trackingCode, trackingLink },
            orderStatus: 'enviado',
          }
        : order
    );
    setAdminState((prev) => ({ ...prev, orders: updatedOrders }));
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
      <h2 className="text-xl font-bold mb-4 text-white">Gestión de Pedidos</h2>
      <table className="w-full">
        <thead>
          <tr className="bg-black bg-opacity-75 text-white">
            <th className="py-2 px-4">ID del Pedido</th>
            <th className="py-2 px-4">Cliente</th>
            <th className="py-2 px-4">Estado</th>
            <th className="py-2 px-4">Seguimiento</th>
            <th className="py-2 px-4">Estado del Reembolso</th>
            <th className="py-2 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} className="text-center">
              <td className="py-2 px-4">{order.id}</td>
              <td className="py-2 px-4">{order.customer}</td>
              <td className="py-2 px-4">{order.orderStatus}</td>
              <td className="py-2 px-4">{order.shipment?.trackingCode || "N/A"}</td>
              <td className="py-2 px-4">{order.refundStatus}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => openShipmentModal(order)}
                  className="bg-blue-500 text-white p-1 rounded  mr-2"
                >
                  Enviar Pedido
                </button>
                <button
                  onClick={() => openRefundModal(order)}
                  className="bg-yellow-500 text-white p-1 rounded  mr-2"
                >
                  Procesar Reembolso
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
