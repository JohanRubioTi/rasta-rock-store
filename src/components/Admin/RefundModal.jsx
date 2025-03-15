import React, { useState, useEffect } from 'react';

const RefundModal = ({ modalOpen, order, onClose, onSubmit }) => {
  const [refundStatus, setRefundStatus] = useState("");

  useEffect(() => {
    if (order) {
      setRefundStatus(order.refundStatus || "");
    }
  }, [order]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(refundStatus);
  };

  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="rasta-card-gradient rasta-card-frame p-6 rounded-lg w-full max-w-lg mx-auto">
        <h2 className="text-2xl mb-4">Procesar Reembolso para el Pedido #{order.id}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white">Estado del Reembolso</label>
            <select
              value={refundStatus}
              onChange={(e) => setRefundStatus(e.target.value)}
              className="w-full p-2 rounded"
            >
              <option value="">Seleccionar estado</option>
              <option value="Aprobado">Aprobado</option>
              <option value="Denegado">Denegado</option>
              <option value="Pendiente">Pendiente</option>
            </select>
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
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Actualizar Reembolso
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RefundModal;
