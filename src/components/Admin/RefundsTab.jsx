import React, { useState } from 'react';

const RefundsTab = ({ refunds, onUpdateRefunds }) => {
  const [editingRefunds, setEditingRefunds] = useState(refunds);
  const [editingRows, setEditingRows] = useState({});

  const toggleEditRow = (refundId) => {
    setEditingRows(prev => ({ ...prev, [refundId]: !prev[refundId] }));
  };

  const handleCellUpdate = (refundId, field, newValue) => {
    const updated = editingRefunds.map(refund => {
      if (refund.id === refundId) {
        const value = field === 'amount' ? Number(newValue) : newValue;
        return { ...refund, [field]: value };
      }
      return refund;
    });
    setEditingRefunds(updated);
    onUpdateRefunds(updated);
  };

  const handleAddRefund = () => {
    const newId = editingRefunds.length > 0 ? Math.max(...editingRefunds.map(r => Number(r.id))) + 1 : 1;
    const newRefund = { id: newId, customer: 'Nuevo Cliente', amount: 0, status: 'Pending' };
    const updated = [...editingRefunds, newRefund];
    setEditingRefunds(updated);
    onUpdateRefunds(updated);
  };

  return (
    <div className="admin-table-card p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-2 text-white">Refunds</h2>
      <button
        onClick={handleAddRefund}
        className="bg-white text-gray-800 px-4 py-2 rounded hover:bg-gray-300 mb-4"
      >
        Agregar Refund
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Monto</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {editingRefunds.map(refund => (
            <tr key={refund.id}>
              <td>{refund.id}</td>
              <td
                contentEditable={!!editingRows[refund.id]}
                suppressContentEditableWarning
                onBlur={(e) => handleCellUpdate(refund.id, 'customer', e.target.textContent)}
              >
                {refund.customer}
              </td>
              <td
                contentEditable={!!editingRows[refund.id]}
                suppressContentEditableWarning
                onBlur={(e) => handleCellUpdate(refund.id, 'amount', e.target.textContent)}
              >
                {refund.amount}
              </td>
              <td
                contentEditable={!!editingRows[refund.id]}
                suppressContentEditableWarning
                onBlur={(e) => handleCellUpdate(refund.id, 'status', e.target.textContent)}
              >
                {refund.status}
              </td>
              <td>
                <button
                  onClick={() => toggleEditRow(refund.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-2"
                >
                  {editingRows[refund.id] ? 'Guardar' : 'Editar'}
                </button>
                <button
                  onClick={() => {
                    const updated = editingRefunds.filter(r => r.id !== refund.id);
                    setEditingRefunds(updated);
                    onUpdateRefunds(updated);
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RefundsTab;
