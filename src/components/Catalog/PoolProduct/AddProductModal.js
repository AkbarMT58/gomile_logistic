import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { addNewProduct, checkLinkData } from 'service/api';
import swal from 'sweetalert';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  maxwidth: 800,
  maxHeight: 600,
  bgcolor: 'background.paper',
  border: '1px solid lightgray',
  boxShadow: 24,
  borderRadius: '5px',
  p: 3,
};

export default function AddProductModal({ setUpdate }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [link, setLink] = useState('');
  const [show, setShow] = useState(false);
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isAddProductLoading, setIsAddProductLoading] = useState(false);

  const checkLink = async () => {
    setLoading(true);
    const body = JSON.stringify({ link });
    const data = await checkLinkData(body);
    if (data?.status === 200) {
      setProductData({ ...data.data, name: '', recommend: false });
      setShow(true);
    }
    if (data?.status === 404) {
      swal('Oops', `${data.message} !`, 'error');
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === 'price') {
      const PriceValue = parseFloat(value);
      setProductData((prev) => {
        return { ...prev, price: PriceValue };
      });
    }

    setProductData((prev) => {
      return { ...prev, [name]: checked ? checked : value };
    });
  };

  const addProduct = async () => {
    setIsAddProductLoading(true);

    const body = {
      id_request: productData?.id_request,
      idvariant: productData?.idvariant,
      image: productData?.image,
      link: productData?.link,
      price: parseFloat(productData?.price),
      product: productData?.product,
      recommend: productData?.recommend,
      category: productData?.category,
      name: productData?.name,
    };

    const data = await addNewProduct(JSON.stringify(body));
    if (data?.status === 200) {
      swal('Success', 'Product added successfully', 'success');
      setUpdate((prev) => !prev);
      setProductData({});
      handleClose();
      setShow(false);
      setLink('');
      setIsAddProductLoading(false);
    }
    if (data?.message <= 400) {
      swal('Oops', data?.message, 'error');
    }
  };

  const renderLoading = loading ? (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'start',
        padding: '5px',
        borderRadius: 2,
        backgroundColor: 'white',
        marginBottom: 1,
      }}>
      <div className='flex space-x-3 items-center w-full bg-blue-100 p-3 rounded-md'>
        <CircularProgress size={20} />
        <p className='text-gray-500 text-sm '>Getting image ...</p>
      </div>
    </Box>
  ) : null;

  return (
    <div>
      <button
        onClick={() => {
          handleOpen();
        }}
        className='text-sm bg-blue-500 py-2 px-3 rounded-md hover:bg-blue-300  transition-all duration-300 text-white'>
        Add Product
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style} className='variant-scroll overflow-y-scroll'>
          <div className='flex justify-end -mt-5'>
            <IconButton
              onClick={() => {
                handleClose();
                setShow(false);
              }}
              style={{ textAlign: 'right' }}>
              <CloseIcon />
            </IconButton>
          </div>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Add Product
          </Typography>
          <hr />
          {renderLoading}
          {!show ? (
            <div className='w-full space-y-3 mt-3'>
              <label>Link Product</label>
              <input
                type='text'
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className='p-2 border border-gray-300 focus:outline-blue rounded-md w-full'
              />
              <div className='flex justify-end'>
                <button
                  onClick={checkLink}
                  className='px-5 py-2 text-white bg-blue-500 rounded-md'>
                  Search
                </button>
              </div>
            </div>
          ) : (
            <div className='space-y-5'>
              <div className=' flex justify-center mt-2'>
                <img src={productData?.image} alt='' className='h-52' />
              </div>
              <div>
                <label>Nama Catalog</label>
                <input
                  type='text'
                  name='name'
                  value={productData?.name}
                  onChange={handleChange}
                  className='p-2 border border-gray-300 focus:outline-blue rounded-md w-full'
                />
              </div>
              <div>
                <label>RMB</label>
                <input
                  type='number'
                  name='price'
                  value={productData?.price}
                  onChange={handleChange}
                  className='p-2 border border-gray-300 focus:outline-blue rounded-md w-full'
                />
              </div>
              <div className='flex flex-col'>
                <label>Product Category</label>
                <select
                  name='category'
                  value={productData?.category}
                  onChange={handleChange}
                  className=' rounded-md focus:outline-blue border border-gray-300 p-2'>
                  <option value='' disabled>
                    Select Category
                  </option>
                  <option value='Fashion Pria'>Fashion Pria</option>
                  <option value='Fashion wanita'>Fashion wanita</option>
                  <option value='Peralatan rumah tangga'>
                    Peralatan rumah tangga
                  </option>
                  <option value='Olahraga'>Olahraga</option>
                  <option value='Elektronik'>Elektronik</option>
                  <option value='Produk musim hujan'>Produk Musim Hujan</option>
                  <option value='Produk natal'>Produk Natal</option>
                  <option value='Produk Imlek'>Produk Imlek</option>
                </select>
              </div>
              <div className='flex justify-between items-center'>
                <label>Product Recommendation ?</label>
                <input
                  type='checkbox'
                  name='recomended'
                  checked={productData?.recommended}
                  onChange={handleChange}
                  style={{ width: '15px', height: '15px' }}
                />
              </div>
              <hr />
              <div className='flex justify-end'>
                <button
                  disabled={isAddProductLoading === true ? true : false}
                  onClick={addProduct}
                  className={`${
                    isAddProductLoading === true ? 'bg-gray-500' : 'bg-red-500'
                  } text-sm py-2 px-3 text-white rounded-md`}>
                  Add Product
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
