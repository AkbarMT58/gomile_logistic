import { IconButton, Tooltip } from '@mui/material';
import EditProductModal from './EditProductModal';
import AddIcon from '@mui/icons-material/Add';
import { addCatalogProduct } from 'service/api';
import swal from 'sweetalert';

const ProductCard = ({ data, setUpdate }) => {
  const addProductToCatalog = async () => {
    const body = JSON.stringify({ ...data, price: data.price / 2350 });
    const response = await addCatalogProduct(body);
    if (response?.status === 200) {
      swal('Success', 'Product has been added to Catalog !', 'success');
      setUpdate((prev) => !prev);
    }
    if (response?.status === 404) {
      swal('Oops', response.message, 'error');
    }
  };

  return (
    <div className='bg-white pt-8 pb-4 px-5 rounded-xl relative shadow-md '>
      <div className='relative'>
        <a href={data.link} target='_blank' rel='noreferrer'>
          <img
            src={data.image}
            alt=''
            style={{ filter: !data.available ? 'grayscale(100%)' : '' }}
            className={`rounded-lg 2xl:h-96 md:h-56 w-full object-cover mt-2`}
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
            data.price === 1 ? '0' : data.price.toLocaleString('id-ID')
          }`}</p>
          <div
            className={`${
              data.recommend && 'bg-ocistok_nav-blue shadow-md'
            } p-2 rounded-md`}>
            {data.recommend && <img src='/like.png' alt='' className='w-3' />}
          </div>
        </div>
      </div>
      <div className='flex items-center justify-between absolute w-full top-0 right-0 px-5 pt-2'>
        <button
          onClick={addProductToCatalog}
          disabled={!data.canAddToCatalog}
          className={`${
            !data.canAddToCatalog ? 'bg-gray-300' : 'bg-blue-500'
          } rounded-full  w-6 h-6 text-white  flex justify-center items-center shadow-md`}>
          <IconButton>
            <AddIcon sx={{ color: 'white' }} />
          </IconButton>
        </button>
        <EditProductModal data={data} setUpdate={setUpdate} />
      </div>
    </div>
  );
};

export default ProductCard;
