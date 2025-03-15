import React from 'react';

const tabs = ["Productos", "Categorías", "Pedidos", "Reembolsos"];

const TabNavigation = ({ activeTab, onChange }) => (
  <div className="flex space-x-4 mb-4">
    {tabs.map(tab => (
      <button
        key={tab}
        onClick={() => onChange(tab)}
        className={`py-2 px-6 rounded-t-lg ${activeTab === tab ? "bg-rasta-tab-active text-white font-semibold" : "bg-rasta-tab-inactive text-gray-300 hover:text-white"}`}
      >
        {tab}
      </button>
    ))}
  </div>
);

export default TabNavigation;
