import React from 'react';
import Invoice from './PRinting';


const Ajjpp: React.FC = () => {
  const invoiceData = {
    recipient: 'John Doe',
    items: [
      { description: 'Product 1', quantity: 2, unitPrice: 10, total: 20 },
      { description: 'Product 2', quantity: 1, unitPrice: 15, total: 15 },
      { description: 'Product 3', quantity: 3, unitPrice: 8, total: 24 },
    ],
  };

  return (
    <div>
      <Invoice invoiceData={invoiceData} />
    </div>
  );
};

export default Ajjpp;