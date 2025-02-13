import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

    useEffect(() => {
    // Fetch initial data (products, orders, users)
    const fetchData = async () => {
      try {
        const productResponse = await fetch('/api/products');
        const productData = await productResponse.json();
        setProducts(productData);

        const orderResponse = await fetch('/api/orders');
        const orderData = await orderResponse.json();
        setOrders(orderData);

        const userResponse = await fetch('/api/users');
        const userData = await userResponse.json();
        setUsers(userData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Product Management */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Products</h2>
          <Link to="/admin/products/add" className="bg-rastaGreen text-white px-4 py-2 rounded hover:bg-green-600">Add Product</Link>
          <ul>
            {products.map(product => (
              <li key={product.id} className="mb-1">
                {product.name} - <Link to={`/admin/products/edit/${product.id}`} className='text-blue-400'>Edit</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Order Management */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Orders</h2>
          <ul>
            {orders.map(order => (
              <li key={order.id} className="mb-1">
                Order #{order.id} - Status: {order.status}
              </li>
            ))}
          </ul>
        </div>

        {/* User Management */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Users</h2>
          <ul>
           {users.map(user => (
              <li key={user.id} className="mb-1">
                {user.name} - Role: {user.role}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
