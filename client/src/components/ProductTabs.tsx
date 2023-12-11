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
        <button onClick={() => setActiveTab('Description')}>Description</button>

        <button onClick={() => setActiveTab('Details')}>Details</button>
      </div>

      <div>
        {activeTab === 'Description' && <div>{description}</div>}

        {activeTab === 'Details' && <div>{details}</div>}
      </div>
    </div>
  );
}

export default ProductTabs;
