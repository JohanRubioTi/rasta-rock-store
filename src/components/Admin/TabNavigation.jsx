import React from 'react';

const tabs = ["Productos", "Categorías", "Pedidos", "Reembolsos"];

const TabNavigation = ({ activeTab, onChange }) => (
  <div className="flex space-x-4 mb-4 border-b border-gray-500">
    {tabs.map(tab => (
      <button
        key={tab}
        onClick={() => onChange(tab)}
        className={`py-2 px-4 ${activeTab === tab ? "border-b-2 border-white text-white font-bold" : "text-gray-300"}`}
      >
        {tab}
      </button>
    ))}
  </div>
);

export default TabNavigation;
