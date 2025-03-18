import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import ShipmentModal from './ShipmentModal';
import RefundModal from './RefundModal';

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [shipmentModalOpen, setShipmentModalOpen] = useState(false);
  const [refundModalOpen, setRefundModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase.from('orders').select('*');
      if (error) {
        console.error('Error fetching orders:', error);
      } else {
        // Map the fetched data to match the expected structure
        const formattedOrders = data.map(order => ({
            id: order.id,
            customer: order.buyer_name, // Assuming buyer_name is the customer's name
            orderStatus: order.order_status,
            shipment: {
              trackingCode: order.shipment_tracking_code,
              trackingLink: order.shipment_tracking_link,
            },
            refundStatus: order.refundStatus || "Ninguno", // Assuming a refundStatus field exists
            items: order.items,
            buyer: {
                name: order.buyer_name,
                address: order.buyer_address
            },
            payment: {
                status: order.payment_status,
                transactionId: order.transaction_id
            },
            createdAt: order.created_at
        }));
        setOrders(formattedOrders);
      }
    };

    fetchOrders();
  }, []);

  const openShipmentModal = (order) => {
    setSelectedOrder(order);
    setShipmentModalOpen(true);
  };

  const openRefundModal = (order) => {
    setSelectedOrder(order);
    setRefundModalOpen(true);
  };

 const handleShipmentUpdate = async (trackingCode, trackingLink) => {
    if (!selectedOrder) return;

    const updatedOrder = {
      shipment_tracking_code: trackingCode,
      shipment_tracking_link: trackingLink,
      order_status: 'shipped',
    };

    const { error } = await supabase.from('orders').update(updatedOrder).eq('id', selectedOrder.id);

    if (error) {
      console.error('Error updating shipment:', error);
      alert('Error updating shipment: ' + error.message);
    } else {
      // Update local state to reflect the changes
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === selectedOrder.id
            ? { ...order, shipment: { trackingCode, trackingLink }, orderStatus: 'shipped' }
            : order
        )
      );
      setShipmentModalOpen(false);
    }
  };

  const handleRefundProcess = async (refundStatus) => {
    if (!selectedOrder) return;

    const updatedOrder = {
      refundStatus: refundStatus,
    };

    const { error } = await supabase.from('orders').update(updatedOrder).eq('id', selectedOrder.id);

    if (error) {
      console.error('Error updating refund status:', error);
      alert('Error updating refund status: ' + error.message);
    } else {
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === selectedOrder.id ? { ...order, refundStatus } : order
        )
      );
      setRefundModalOpen(false);
    }
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
