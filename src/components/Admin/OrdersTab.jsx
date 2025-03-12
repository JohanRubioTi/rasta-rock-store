import OrdersManagement from './OrdersManagement';

const OrdersTab = ({ orders }) => {
  return (
    <div className="rasta-card-gradient rasta-card-frame p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-2 text-white">Pedidos</h2>
      <OrdersManagement orders={orders} />
    </div>
  );
};

export default OrdersTab;
