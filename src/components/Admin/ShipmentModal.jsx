import React, { useState, useEffect } from 'react';

const ShipmentModal = ({ modalOpen, order, onClose, onSubmit }) => {
  const [trackingCode, setTrackingCode] = useState("");
  const [trackingLink, setTrackingLink] = useState("");

  useEffect(() => {
    if (order && order.shipment) {
      setTrackingCode(order.shipment.trackingCode || "");
      setTrackingLink(order.shipment.trackingLink || "");
    }
  }, [order]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(trackingCode, trackingLink);
  };

  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="rasta-card-gradient rasta-card-frame p-6 rounded-lg w-full max-w-lg mx-auto">
        <h2 className="text-2xl mb-4">Gestionar Envío para el Pedido #{order.id}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white">Código de Seguimiento</label>
            <input
              type="text"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              className="w-full p-2 rounded"
              placeholder="Ingrese el código de seguimiento"
            />
          </div>
          <div>
            <label className="block text-white">Enlace de Seguimiento</label>
            <input
              type="url"
              value={trackingLink}
              onChange={(e) => setTrackingLink(e.target.value)}
              className="w-full p-2 rounded"
              placeholder="Ingrese la URL de seguimiento"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Actualizar Envío
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShipmentModal;
