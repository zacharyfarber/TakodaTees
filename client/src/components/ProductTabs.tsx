import { useState } from 'react';

function ProductTabs({
  description,
  details
}: {
  description: string;
  details: string;
}) {
  const [activeTab, setActiveTab] = useState('Description');

  return (
    <div>
      <div>
        <button
          onClick={() => setActiveTab('Description')}
          className={`font-nanum text-2xl mr-[.125rem] border border-[#1E1E1E]/50 w-40 border-b-0 ${
            activeTab === 'Description' ? 'bg-[#d2d2d2]' : ''
          }`}
        >
          Description
        </button>

        <button
          onClick={() => setActiveTab('Details')}
          className={`font-nanum text-2xl ml-[.125rem] border border-[#1E1E1E]/50 w-40 border-b-0 ${
            activeTab === 'Details' ? 'bg-[#d2d2d2]' : ''
          }`}
        >
          Details
        </button>
      </div>

      <div className="border border-[#1E1E1E] min-h-[15rem] px-2 py-4">
        {activeTab === 'Description' && (
          <div className="h-full font-simonetta text-2xl">{description}</div>
        )}

        {activeTab === 'Details' && (
          <div className="h-full font-simonetta text-2xl">{details}</div>
        )}
      </div>
    </div>
  );
}

export default ProductTabs;
