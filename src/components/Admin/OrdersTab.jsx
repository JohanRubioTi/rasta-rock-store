import OrdersManagement from './OrdersManagement';

const OrdersTab = ({ orders }) => {
  return (
    <div className="bg-black bg-opacity-75 backdrop-blur-xl rasta p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-2 text-white">Pedidos</h2>
      <OrdersManagement orders={orders} />
    </div>
  );
};

export default OrdersTab;
