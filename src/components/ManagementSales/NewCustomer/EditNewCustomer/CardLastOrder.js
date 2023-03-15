import React, { useState } from 'react';
import swal from 'sweetalert';
import LayoutCard from './LayoutCard';

const CardLastOrder = ({ lastOrder }) => {
  const [isViewAllOrder, setIsViewAllOrder] = useState(2);

  const handleViewAllOrder = () => {
    if (isViewAllOrder !== lastOrder[0]?.Produk?.length) {
      setIsViewAllOrder(lastOrder[0]?.Produk?.length);
    } else {
      swal('info', 'There No Orders To Show Up', 'info');
    }
  };

  return (
    <LayoutCard classNames={'mt-5'}>
      <div className='text-start text-lg font-bold text-black uppercase px-5 my-2'>
        Last order placed
      </div>
      <hr className='border-black border-px my-2' />

      {!lastOrder[0] ? (
        <div className='px-5 flex items-center justify-center h-20'>
          <div className='text-xl text-blue-400'>Belum Membuat Orderan</div>
        </div>
      ) : (
        <>
          <div className='px-5'>
            <div className='flex justify-between items-center'>
              <div className='text-start text-xl font-bold'>
                <div className=' text-blue-500 uppercase'>
                  Order #{lastOrder[0]?.id_so}
                </div>
                <div className=' text-gray-500 uppercase'>
                  IDR {lastOrder[0]?.total_harga?.toLocaleString('id-ID')} from
                  Draft Orders
                </div>
              </div>
              <div className='text-xl font-bold text-gray-500 uppercase'>
                {lastOrder[0]?.tanggal}
              </div>
            </div>

            <div className='w-full h-full grid grid-cols-2 gap-5 mt-5'>
              {lastOrder?.slice(0, 1).map((user, index) => (
                <React.Fragment key={index}>
                  {user?.Produk?.slice(0, 2).map((product, index) => (
                    <div
                      key={index}
                      className='flex flex-cols items-center gap-2 h-32'>
                      <img
                        className='w-1/4 h-full rounded-md shadow-md'
                        src={`${
                          product?.gambar
                            ? product?.gambar
                            : 'https://ocistok.com/default-image.png'
                        }`}
                        alt=''
                      />
                      <div className='text-lg text-gray-500 font-bold line-clamp-3 '>
                        {product?.produk}
                      </div>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>

            <div className='flex justify-end items-center gap-5 mt-5 mr-5'>
              <button
                onClick={handleViewAllOrder}
                className={`${
                  isViewAllOrder === lastOrder[0]?.Produk?.length
                    ? 'hidden'
                    : 'block'
                } text-blue-400 font-bold`}>
                View All Orders
              </button>
              {/* <button className='bg-blue-400 text-white rounded-xl font-bold py-4 px-3'>
                Create Order
              </button> */}
            </div>
          </div>
        </>
      )}
    </LayoutCard>
  );
};

export default CardLastOrder;
