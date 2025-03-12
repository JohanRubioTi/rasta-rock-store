import React from 'react';

const RefundsTab = ({ orders }) => {
  const reembolsos = orders.filter(
    pedido => pedido.refundStatus && pedido.refundStatus !== "Ninguno"
  );

  return (
    <div className="rasta-card-gradient rasta-card-frame p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-2 text-white">Reembolsos</h2>
      {reembolsos.length > 0 ? (
        <ul className="text-white">
          {reembolsos.map(reembolso => (
            <li key={reembolso.id} className="mb-1">
              Pedido #{reembolso.id} - Estado de Reembolso: {reembolso.refundStatus}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-300">No hay solicitudes de reembolso disponibles.</p>
      )}
    </div>
  );
};

export default RefundsTab;
