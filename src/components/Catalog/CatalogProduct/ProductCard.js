import React from 'react';
import { deleteProductCatalog } from 'service/api';
import swal from 'sweetalert';

const ProductCard = ({ data, setUpdate }) => {
  const deleteFromCatalog = async (data) => {
    const body = JSON.stringify({ product: [data] });
    const response = await deleteProductCatalog(body);
    if (response.status === 200) {
      swal('Succes', 'Product has been remove !', 'success');
      setUpdate((prev) => !prev);
    }
  };
  return (
    <>
      <div className='flex space-y-5 gap-5 w-full bg-white px-10 py-2 rounded-md relavtive mt-2'>
        <img
          src={`${data?.image}`}
          className='w-32 object-contain'
          alt={`${data?.image}`}
        />
        <div className='flex w-full justify-between'>
          <div className='w-10/12 text-gray-800'>
            <p className='font-semibold text-lg line-clamp-2'>
              {data?.product}
            </p>
            <div className='flex gap-5 text-gray-800 font-semibold '>
              <p>Toko : {data?.toko}</p>
              <p>Category : {data?.category}</p>
            </div>
            {data?.recommend && (
              <div className='px-2 py-2 bg-yellow-400 inline-block my-2 rounded-md text-white font-semibold text-xs'>
                Recomended
              </div>
            )}
          </div>
          <div className='flex flex-col justify-around items-center'>
            <a
              href={`https://ocistok.com/product/${data?.toko}/${data?.id_variant}`}
              target='_blank'
              rel='noreferrer'
              className='w-full bg-yellow-500 hover:bg-yellow-600 rounded-sm text-sm text-white font-semibold p-2 hover:scale-110 duration-200'>
              Open Link
            </a>
            <button
              onClick={(e) => deleteFromCatalog(data)}
              className='w-full bg-red-500 hover:bg-red-600 rounded-sm text-sm text-white font-semibold p-2 hover:scale-110 duration-200'>
              Remove
            </button>
          </div>
        </div>
      </div>

      {/* <div className='bg-white pt-8 pb-4 px-5 rounded-xl relative shadow-md '>
        <div className='relative'>
          <a href={data.link} target='_blank' rel='noreferrer'>
            <img
              src={data.image}
              alt=''
              className='rounded-lg 2xl:h-96 md:h-56 w-full object-cover mt-2'
            />
          </a>
          {data.category && (
            <div className='text-sm px-3 bg-ocistok_nav-blue absolute z-50 text-white bottom-0 right-0 rounded-tl-xl py-1'>
              {data.category}
            </div>
          )}
        </div>
        <div className='mt-1 space-y-2'>
          <Tooltip title={data.product}>
            <p className='line-clamp-1'>{data.product}</p>
          </Tooltip>
          <div className='flex items-center justify-between'>
            <p className='font-semibold'>{`IDR ${
              data.price ? data.price.toLocaleString('id-ID') : data.price
            }`}</p>
            <div
              className={`${
                data.recommend && 'bg-ocistok_nav-blue shadow-md'
              } p-2 rounded-md`}>
              {data.recommend && <img src='/like.png' alt='' className='w-3' />}
            </div>
          </div>
        </div>
        <div className='absolute top-2 right-5 rounded-full bg-red-500 w-6 h-6  flex justify-center items-center shadow-md'>
          <IconButton onClick={() => deleteFromCatalog(data)}>
            <CloseIcon fontSize='small' sx={{ color: 'white' }} />
          </IconButton>
        </div>
      </div> */}
    </>
  );
};

export default ProductCard;
