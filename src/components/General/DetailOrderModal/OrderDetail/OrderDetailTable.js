import React from 'react';

export default function OrderDetailTable({ orderData }) {
  return (
    <>
      <div className='h-64 border border-gray-100 overflow-y-scroll variant-scroll mt-3'>
        {/* Table */}
        <table className='min-w-full bg-white border border-gray-200 rounded-md'>
          <thead className='border-b border-gray-200 '>
            <tr>
              <th className='text-left py-3 px-4 font-normal text-xs'>PIC</th>
              <th className='text-left py-3 px-4 font-normal text-xs'>SKU</th>
              <th className='text-left py-3 px-4 font-normal text-xs'>
                Product
              </th>
              <th className='text-left py-3 px-4 font-normal text-xs'>Link</th>
              <th className='text-left py-3 px-4 font-normal text-xs'>
                Quantity
              </th>
              <th className='text-left py-3 px-4 font-normal text-xs'>Price</th>
              <th className='text-left py-3 px-4 font-normal text-xs'>
                Total Price
              </th>
            </tr>
          </thead>
          <tbody
            style={{ height: '100px' }}
            className='text-gray-700 rounded-b-md'>
            {orderData.product?.map((product, id) => (
              <tr key={id} className='border-b border-gray-200'>
                <td className='text-left py-3 px-4'>
                  <img
                    src={product?.image ? product?.image : '/default_image.png'}
                    alt='product'
                    className='w-20 rounded-md object-cover shadow-md'
                  />
                </td>
                <td className='text-left py-3 px-4 text-xs'>
                  <p title={product.sku}>{product.sku}</p>
                </td>
                <td className='text-left py-3 px-4 text-xs'>
                  <p className='line-clamp-2' title={product.product}>
                    {product.product}
                  </p>
                </td>
                <td className='text-left py-3 px-4 text-xs'>
                  <a
                    href={product?.link}
                    target='_blank'
                    rel='noreferrer noopener'
                    className='line-clamp-1 w-[100px] text-blue-500 hover:text-orange-500'>
                    {product?.link}
                  </a>
                </td>
                <td className='text-left py-3 px-4 text-xs'>
                  <p>{product.qty}</p>
                </td>
                <td className='text-left py-3 px-4 text-xs'>
                  <p>Rp. {product.price.toLocaleString('id-ID')}</p>
                </td>
                <td className='text-left py-3 px-4 text-xs'>
                  <p>Rp. {product.total.toLocaleString('id-ID')}</p>
                </td>
              </tr>
            ))}
            <tr>
              <td
                className='text-left py-2 px-4 text-xs font-semibold'
                colSpan='4'>
                Total
              </td>
              <td className='text-left py-2 px-4 text-xs font-semibold'>
                {orderData.qty} pcs
              </td>
              <td
                className='text-right py-2 px-4 text-xs font-semibold'
                colSpan='2'>
                Rp. {orderData.total.toLocaleString('id-ID')}
              </td>
            </tr>
            <tr>
              <td
                className='text-left py-2 px-4 text-xs font-semibold'
                colSpan='4'>
                Shipping Fee
              </td>
              <td
                className='text-right py-2 px-4 text-xs font-semibold'
                colSpan='3'>
                Rp. {orderData.shipping.toLocaleString('id-ID')}
              </td>
            </tr>
            <tr>
              <td
                className='text-left py-2 px-4 text-xs font-semibold'
                colSpan='4'>
                Discount
              </td>
              <td
                className='text-right py-2 px-4 text-xs font-semibold'
                colSpan='3'>
                {orderData.discount
                  ? 'Rp. ' + orderData.discount.toLocaleString('id-ID')
                  : '-'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
