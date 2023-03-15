import React from 'react';

const OrderDetailHeader = ({ orderData, id_group, financialData }) => {
  const { income } = financialData;
  return (
    <div className='grid grid-cols-2 gap-4 my-2'>
      <div className='flex flex-col text-xs space-y-2 '>
        <div className='flex'>
          <p className='w-2/6'>Order Number</p>
          <p className='w-1/6'>:</p>
          <p className='w-3/6'>{orderData.orderNumber}</p>
        </div>
        {id_group && (
          <div className='flex'>
            <p className='w-2/6'>Order Group</p>
            <p className='w-1/6'>:</p>
            <p className='w-3/6'>{id_group ?? 'N/A'}</p>
          </div>
        )}
        <div className='flex'>
          <p className='w-2/6'>Sales</p>
          <p className='w-1/6'>:</p>
          <p className='w-3/6 capitalize'> {orderData.sales}</p>
        </div>
        <div className='flex'>
          <p className='w-2/6'>Refund Amount</p>
          <p className='w-1/6'>:</p>
          <p className='w-3/6'>
            IDR {orderData.refund.toLocaleString('id-ID')}
          </p>
        </div>
        <div className='flex'>
          <p className='w-2/6'>Order Income</p>
          <p className='w-1/6'>:</p>
          <p className='w-3/6'>
            IDR {(income?.customerPayment + income?.shippingCustomer + income?.discount + income?.others + income.processing_fee).toLocaleString('id-ID')}
          </p>
        </div>
      </div>
      <div className='flex flex-col text-xs space-y-2 '>
        <div className='flex'>
          <p className='w-2/6'>Payment Time</p>
          <p className='w-1/6'>:</p>
          <p className='w-3/6 line-clamp-1' title={orderData.paymentDate}>
            {orderData.paymentDate}
          </p>
        </div>
        <div className='flex'>
          <p className='w-2/6'>Status</p>
          <p className='w-1/6'>:</p>
          <p className='w-3/6 capitalize'> {orderData.status}</p>
        </div>
        <div className='flex'>
          <p className='w-2/6'>Order Expense</p>
          <p className='w-1/6'>:</p>
          <p className='w-3/6'>
            <span className='font-semibold'>IDR:</span>{' '}
            {orderData.expenseIdr.toLocaleString('id-ID')}{' '}
            <span className='ml-2 font-semibold'>RMB:</span>{' '}
            {Math.round(orderData.expenseRmb)}
          </p>
        </div>
        <div className='flex'>
          <p className='w-2/6'>Delivery Time</p>
          <p className='w-1/6'>:</p>
          <p className='w-3/6'>{orderData.eta ? orderData.eta : 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailHeader;
