import React, { useState, useEffect } from 'react';

const ShipmentModal = ({ modalOpen, order, onClose, onSubmit }) => {
  const [tracking, setTracking] = useState("");

  useEffect(() => {
    if (order) {
      setTracking(order.tracking || "");
    }
  }, [order]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(tracking);
  };

  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="rasta-card-gradient rasta-card-frame p-6 rounded-lg w-full max-w-lg mx-auto">
        <h2 className="text-2xl mb-4">Manage Shipment for Order #{order.id}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white">Tracking Code</label>
            <input
              type="text"
              value={tracking}
              onChange={(e) => setTracking(e.target.value)}
              className="w-full p-2 rounded"
              placeholder="Enter tracking code"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Update Shipment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShipmentModal;
