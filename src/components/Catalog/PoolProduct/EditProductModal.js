import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { editPoolProduct, getDetailProduct } from 'service/api';
import swal from 'sweetalert';
import EditIcon from '@mui/icons-material/Edit';

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

export default function EditProductModal({ data, setUpdate }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [show, setShow] = useState(false);
  const [productData, setProductData] = useState(data);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'recommend') {
      setProductData((prev) => {
        return { ...prev, [name]: checked };
      });
    } else {
      setProductData((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };

  const editProduct = async () => {
    const body = JSON.stringify({
      ...productData,
      price: Number(productData.price),
    });
    const data = await editPoolProduct(body);
    if (data?.status === 200) {
      swal('Success', 'Product edited succesfully', 'success');
      setUpdate((prev) => !prev);
      handleClose();
    }
  };

  const getProductData = async (data) => {
    setIsLoading(true);
    const body = JSON.stringify({
      url: data.link,
      idRequest: data.id_request,
      idVariant: Number(data.id_variant),
    });

    if (data.image === null || data.image === '' || data.price === 1) {
      const response = await getDetailProduct(body);
      if (response?.status === 200) {
        setProductData((prev) => {
          return { ...prev, image: response.gambar, price: response.harga };
        });
        setUpdate((prev) => !prev);
      }
      if (response?.status === 404) {
        swal('Oops', 'Product is not available !', 'error');
        handleClose();
        setUpdate((prev) => !prev);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (data.image !== null || data.image !== '') {
      setProductData({
        ...data,
        category: data.category ? data.category : '',
        price: (data.price / 2350).toFixed(2),
      });
    }
  }, [data]);

  return (
    <div>
      <button
        disabled={!data.available}
        className={`rounded-full ${
          !data.available ? 'bg-gray-300' : 'bg-red-500'
        } w-6 h-6  flex justify-center items-center shadow-md`}
        onClick={() => {
          handleOpen();
          getProductData(data);
        }}>
        <IconButton>
          <EditIcon fontSize='small' sx={{ color: 'white' }} />
        </IconButton>
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
                setShow(!show);
              }}
              style={{ textAlign: 'right' }}>
              <CloseIcon />
            </IconButton>
          </div>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Edit Product
          </Typography>
          <hr />
          {isLoading ? (
            <div className='flex flex-col space-y-3 items-center w-full mt-5'>
              <CircularProgress size={20} />
              <p className='text-gray-500 text-sm '>Getting data ...</p>
            </div>
          ) : (
            <div className='space-y-5'>
              <div className=' flex justify-center mt-2'>
                <img src={productData?.image} alt='' className='h-52' />
              </div>
              <div>
                <label>RMB</label>
                <input
                  type='number'
                  name='price'
                  value={productData.price}
                  onChange={handleChange}
                  className='p-2 border border-gray-300 focus:outline-blue rounded-md w-full'
                />
              </div>
              <div className='flex flex-col'>
                <label>Product Category</label>
                <select
                  name='category'
                  value={productData.category}
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
                  <option value='Produk Elektronik'>Produk Elektronik</option>
                  <option value='Produk musim hujan'>Produk Musim Hujan</option>
                  <option value='Produk natal'>Produk Natal</option>
                  <option value='Produk imlek'>Produk Imlek</option>
                </select>
              </div>
              <div className='flex justify-between items-center'>
                <label>Product Recommendation ?</label>
                <input
                  type='checkbox'
                  name='recommend'
                  checked={productData.recommend}
                  onChange={handleChange}
                  style={{ width: '15px', height: '15px' }}
                />
              </div>
              <hr />
              <div className='flex justify-end'>
                <button
                  onClick={editProduct}
                  className='text-sm py-2 px-3 bg-red-500 text-white rounded-md'>
                  Edit Product
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
