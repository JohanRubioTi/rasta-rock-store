import React, { useState } from 'react';

const DescTabs = ({ description, careInstructions, additionalInfo }) => {
  const [activeTab, setActiveTab] = useState('description');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex border-b">
        <button
          className={`py-2 px-4 border-b-2 ${activeTab === 'description' ? 'border-blue-500 text-blue-500' : 'border-transparent hover:border-gray-300'}`}
          onClick={() => handleTabClick('description')}
        >
          Description
        </button>
        <button
          className={`py-2 px-4 border-b-2 ${activeTab === 'care' ? 'border-blue-500 text-blue-500' : 'border-transparent hover:border-gray-300'}`}
          onClick={() => handleTabClick('care')}
        >
          Care
        </button>
        <button
          className={`py-2 px-4 border-b-2 ${activeTab === 'info' ? 'border-blue-500 text-blue-500' : 'border-transparent hover:border-gray-300'}`}
          onClick={() => handleTabClick('info')}
        >
          Additional Info
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === 'description' && <p>{description}</p>}
        {activeTab === 'care' && <p>{careInstructions}</p>}
        {activeTab === 'info' && <p>{additionalInfo}</p>}
      </div>
    </div>
  );
};

export default DescTabs;