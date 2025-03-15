import React, { useState } from 'react';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

const RefundsTab = ({ refunds, onUpdateRefunds }) => {
  const [editingRefunds, setEditingRefunds] = useState(refunds);
  const [editingRows, setEditingRows] = useState({});

  const toggleEditRow = (refundId) => {
    setEditingRows((prev) => ({ ...prev, [refundId]: !prev[refundId] }));
  };

  const handleCellUpdate = (refundId, field, newValue) => {
    const updated = editingRefunds.map((refund) => {
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
    const newId =
      editingRefunds.length > 0
        ? Math.max(...editingRefunds.map((r) => Number(r.id))) + 1
        : 1;
    const newRefund = {
      id: newId,
      customer: 'Nuevo Cliente',
      amount: 0,
      status: 'Pendiente',
    };
    const updated = [...editingRefunds, newRefund];
    setEditingRefunds(updated);
    onUpdateRefunds(updated);
  };

  return (
    <div className="bg-black bg-opacity-75 backdrop-blur-xl rasta p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-2 text-white">Reembolsos</h2>
      <button
        onClick={handleAddRefund}
        className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center mb-4"
      >
        <PlusIcon className="h-5 w-5 mr-2" /> Agregar Reembolso
      </button>
      <table className="w-full">
        <thead>
          <tr className="bg-black bg-opacity-75 text-white">
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Cliente</th>
            <th className="py-2 px-4">Monto</th>
            <th className="py-2 px-4">Estado</th>
            <th className="py-2 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {editingRefunds.map((refund) => (
            <tr key={refund.id} className="text-center">
              <td className="py-2 px-4">{refund.id}</td>
              <td
                className="py-2 px-4"
                contentEditable={!!editingRows[refund.id]}
                suppressContentEditableWarning
                onBlur={(e) =>
                  handleCellUpdate(refund.id, 'customer', e.target.textContent)
                }
              >
                {refund.customer}
              </td>
              <td
                className="py-2 px-4"
                contentEditable={!!editingRows[refund.id]}
                suppressContentEditableWarning
                onBlur={(e) =>
                  handleCellUpdate(refund.id, 'amount', e.target.textContent)
                }
              >
                {refund.amount}
              </td>
              <td
                className="py-2 px-4"
                contentEditable={!!editingRows[refund.id]}
                suppressContentEditableWarning
                onBlur={(e) =>
                  handleCellUpdate(refund.id, 'status', e.target.textContent)
                }
              >
                {refund.status}
              </td>
              <td className="py-2 px-4">
                <div className="flex justify-center">
                  <button
                    onClick={() => toggleEditRow(refund.id)}
                    className="bg-blue-500 text-white p-1 rounded  mr-2"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {
                      const updated = editingRefunds.filter(
                        (r) => r.id !== refund.id
                      );
                      setEditingRefunds(updated);
                      onUpdateRefunds(updated);
                    }}
                    className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RefundsTab;
