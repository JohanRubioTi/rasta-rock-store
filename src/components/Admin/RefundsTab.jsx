import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { PencilIcon, TrashIcon, PlusIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const RefundsTab = () => {
  const [refunds, setRefunds] = useState([]);
    const [editingRefunds, setEditingRefunds] = useState([]);
  const [editingRows, setEditingRows] = useState({});
  const [newRefundIds, setNewRefundIds] = useState([]);

  useEffect(() => {
    const fetchRefunds = async () => {
      const { data, error } = await supabase.from('refunds').select('*');
      if (error) {
        console.error('Error fetching refunds:', error);
      } else {
        setRefunds(data);
        setEditingRefunds(data);
      }
    };

    fetchRefunds();
  }, []);

  const updateRefunds = (updatedRefunds) => {
    setEditingRefunds(updatedRefunds);
    setRefunds(updatedRefunds.map(er => {
        const originalRefund = refunds.find(r => r.id === er.id);
        return originalRefund ? {...originalRefund, ...er} : er;
    }));
  };

  const toggleEditRow = (refundId) => {
    setEditingRows((prev) => ({ ...prev, [refundId]: !prev[refundId] }));
  };

 const handleCellUpdate = (refundId, field, newValue) => {
    const updatedRefunds = editingRefunds.map((refund) => {
      if (refund.id === refundId) {
        const value = field === 'amount' ? Number(newValue) : newValue;
        return { ...refund, [field]: value };
      }
      return refund;
    });
    updateRefunds(updatedRefunds);
  };

  const handleAddRefund = async () => {
    const newId =
      editingRefunds.length > 0
        ? Math.max(...editingRefunds.map((r) => Number(r.id))) + 1
        : 1;
    const newRefund = {
      id: newId,
      customer: '',
      amount: 0,
      status: 'Pending',
    };

    setEditingRefunds(prev => [...prev, newRefund]);
    setEditingRows(prev => ({ ...prev, [newId]: true }));
    setNewRefundIds(prev => [...prev, newId]);
    setRefunds(prev => [...prev, newRefund]);
  };

  const handleSaveRefund = async (refundId) => {
    const refundToSave = editingRefunds.find(r => r.id === refundId);
    const isNewRefund = newRefundIds.includes(refundId);

    try{
        if(isNewRefund) {
            const { data, error } = await supabase.from('refunds').insert([refundToSave]).select();
            if(error) throw error;

            setRefunds(prevRefunds => {
                const updatedRefunds = prevRefunds.map(r => (r.id === refundId ? data[0] : r));
                return updatedRefunds;
            });
            setNewRefundIds(prev => prev.filter(id => id !== refundId));
        } else {
            const { error } = await supabase.from('refunds').update(refundToSave).eq('id', refundId);
            if (error) throw error;
            setRefunds(prevRefunds =>
                prevRefunds.map(r => (r.id === refundId ? { ...r, ...refundToSave } : r))
            );
        }
        setEditingRefunds(prevRefunds =>
            prevRefunds.map(r => (r.id === refundId ? { ...r, ...refundToSave } : r))
        );
        setEditingRows(prev => ({ ...prev, [refundId]: false }));
    } catch (error) {
        console.error('Error saving refund:', error);
        alert('Error saving refund: ' + error.message);
    }
  }

  const cancelEditRow = (refundId) => {
    const isNewRefund = newRefundIds.includes(refundId);

    if (isNewRefund) {
        setEditingRefunds(prev => prev.filter(r => r.id !== refundId));
        setRefunds(prev => prev.filter(r => r.id !== refundId));
        setNewRefundIds(prevIds => prevIds.filter(id => id !== refundId));
    } else {
        const originalRefund = refunds.find(r => r.id === refundId);
        if(originalRefund) {
            setEditingRefunds(prev =>
                prev.map(refund => (refund.id === refundId ? originalRefund : refund))
            );
        }
    }
    setEditingRows(prev => ({ ...prev, [refundId]: false}));
  }

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
                {editingRows[refund.id] ? (
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleSaveRefund(refund.id)}
                        className="bg-blue-500 text-white p-1 rounded  mr-2"
                      >
                        <CheckIcon className="h-5 w-5"/>
                      </button>
                      <button
                        onClick={() => cancelEditRow(refund.id)}
                        className="bg-gray-500 text-white p-1 rounded hover:bg-gray-600"
                      >
                        <XMarkIcon className="h-5 w-5"/>
                      </button>
                    </div>
                  ) : (
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
                      updateRefunds(updated);
                    }}
                    className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RefundsTab;
