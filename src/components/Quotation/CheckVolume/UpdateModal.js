import { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import swal from 'sweetalert';
import { IconButton, Tooltip } from '@mui/material';
import { inputVolumeData } from 'service/api';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';
import { selectAddData } from 'redux/addDataSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

export default function UpdateModal({
  id,
  link,
  setUpdate,
  variantsUpdate,
  boxValue,
  category,
  minQty,
}) {
  const { category: Category } = useSelector(selectAddData);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [box, setBox] = useState(boxValue);
  const [volume, setVolume] = useState([]);
  const [selectCategory, setSelectCategory] = useState('');
  const [dataLink, setDataLink] = useState('');

  const handleSelectChange = (e) => {
    setSelectCategory(e.target.value);
  };

  const handleInputChange = (e, i) => {
    const { name, value } = e.target;
    if (i === undefined) {
      setVolume(
        volume.map((data) => {
          return { ...data, [name]: value };
        })
      );
    } else {
      const values = [...volume];
      values[i][name] = value;
      setVolume(values);
    }
  };

  const handleLinkChange = (e) => {
    setDataLink(e.target.value);
  };

  const submitRequest = async () => {
    const validateChecked = volume.filter((data) => data.isChecked === true);
    const validateInput = validateChecked.filter(
      (data) =>
        data.width === '' ||
        data.height === '' ||
        data.width === '' ||
        data.height === '' ||
        data.leth === '' ||
        data.price === ''
    );

    if (validateChecked.length === 0) {
      swal('Oops', 'Please choose at least 1 data before submit !', 'error');
      return;
    }

    if (validateInput.length > 0) {
      swal(
        'Oops',
        'Please fill in all the required data before submit !',
        'error'
      );
      return;
    }
    if (!selectCategory) {
      swal('Oops', 'Please select category before submit !', 'error');
      return;
    }
    const body = JSON.stringify({
      id_request: id,
      category: Number(selectCategory),
      link: link,
      box,
      minQty: Number(minQty),
      product: volume
        .filter((data) => data.isChecked === true)
        .map((data) => {
          return {
            id_product: data.id_product,
            length: Number(data.leth),
            height: Number(data.height),
            width: Number(data.width),
            weight: Number(data.weight),
            price: Number(data.price),
            qty: Number(data.quantity),
          };
        }),
    });

    const data = await inputVolumeData(body);
    if (data?.status === 200) {
      swal('Submitted', ' Request submit succesfully', 'success');
      setVolume(
        variantsUpdate.map(() => {
          return {
            quantity: '',
            width: '',
            leth: '',
            height: '',
            weight: '',
            isChecked: false,
          };
        })
      );
      setSelectCategory('');
      setDataLink('');
      handleClose();
      setUpdate((prev) => !prev);
    }

    if (data?.status === 400) {
      swal('Oops', data.message, 'error');
    }
  };

  const handleChecked = (e, id) => {
    const { checked } = e.target;
    if (id !== undefined) {
      const values = [...volume];
      values[id].isChecked = checked;
      setVolume(values);
    }
  };

  useEffect(() => {
    setSelectCategory(category);
    setVolume(variantsUpdate);
    setDataLink(link);
  }, [category, link, variantsUpdate]);

  return (
    <>
      <button
        className={`flex items-center text-sm text-white space-x-1 p-2 px-3  cursor-pointer rounded-md ${
          variantsUpdate?.length === 0 ? 'bg-gray-400' : 'bg-gray-800'
        }`}
        onClick={handleOpen}
        disabled={variantsUpdate?.length === 0}>
        <EditIcon style={{ fontSize: 16 }} />
        <p>Update Data</p>
      </button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <Box sx={style}>
            <div className='flex justify-end -mt-5'>
              <IconButton onClick={handleClose} style={{ textAlign: 'right' }}>
                <CloseIcon />
              </IconButton>
            </div>
            <Typography id='transition-modal-title' variant='h6' component='h2'>
              Form Update Volume
            </Typography>
            <div className='space-y-4 mt-5'>
              <div className='flex flex-col space-y-3'>
                <div className='flex flex-col space-y-4'>
                  <input
                    type='text'
                    name='link'
                    value={dataLink}
                    onChange={handleLinkChange}
                    className='border border-gray-400 rounded-md p-3 focus:outline-blue'
                  />
                  <select
                    className='border border-gray-400 rounded-md p-3 focus:outline-blue'
                    onChange={handleSelectChange}
                    // disabled={category}
                    value={selectCategory}>
                    <option value=''>Choose Category</option>
                    {Category?.map((cat, i) => (
                      <option key={i} value={cat.value}>{cat.category}</option>
                    ))}
                  </select>
                  <input
                    type='text'
                    name='minQty'
                    defaultValue={minQty}
                    disabled
                    className='border border-gray-400 rounded-md p-3 focus:outline-blue'
                  />
                </div>
                <div className='p-5 border border-gray-300 rounded-md overflow-y-scroll max-h-96 variant-scroll'>
                  <div>
                    {variantsUpdate?.map((t, i) => (
                      <div key={i} className='bg-gray-200 p-2 mt-2 rounded-md'>
                        <div className='space-y-2'>
                          <div className='ml-10 flex space-x-2 items-center'>
                            <div className='w-10'>
                              <img
                                src={`${t.image ? t.image : '/no-image.png'} `}
                                alt='product'
                                className='w-full rounded-md object-cover'
                              />
                            </div>
                            <Tooltip title={t.variant}>
                              <p className='font-semibold text-sm line-clamp-1 cursor-pointer'>
                                {t.variant}
                              </p>
                            </Tooltip>
                          </div>
                          <div className='space-x-2'>
                            <span
                              className={`${
                                t.status === 'Completed'
                                  ? 'text-green-600'
                                  : 'text-red-500'
                              } text-sm font-semibold ml-10`}>
                              {t?.status?.slice(0, 1).toUpperCase() +
                                t?.status?.slice(1)}
                            </span>

                            {t.reason && (
                              <span className='text-red-500 text-xs font-semibold ml-10'>
                                {'- '}
                                {t?.reason?.slice(0, 1).toUpperCase() +
                                  t?.reason?.slice(1)}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className='flex items-center justify-between mt-2'>
                          <input
                            type='checkbox'
                            style={{ width: 20, height: 20 }}
                            checked={volume[i]?.isChecked}
                            onChange={(e) => handleChecked(e, i)}
                          />

                          <input
                            type='number'
                            name='quantity'
                            value={volume[i]?.quantity}
                            placeholder='Qty/Box'
                            className='border border-gray-400 rounded-md p-2 w-32 focus:outline-blue'
                            onChange={(e) => handleInputChange(e, i)}
                          />
                          <input
                            type='number'
                            name='width'
                            value={volume[i]?.width}
                            placeholder='width (CM)'
                            className='border border-gray-400 rounded-md p-2 w-32 focus:outline-blue'
                            onChange={(e) => handleInputChange(e, i)}
                          />
                          <input
                            type='number'
                            name='leth'
                            value={volume[i]?.leth}
                            placeholder='Length (CM)'
                            className='border border-gray-400 rounded-md p-2 w-32 focus:outline-blue'
                            onChange={(e) => handleInputChange(e, i)}
                          />
                          <input
                            type='number'
                            name='height'
                            value={volume[i]?.height}
                            placeholder='Height (CM)'
                            className='border border-gray-400 rounded-md p-2 w-32 focus:outline-blue'
                            onChange={(e) => handleInputChange(e, i)}
                          />
                          <input
                            type='number'
                            name='weight'
                            value={volume[i]?.weight}
                            placeholder='Weight (Gram)'
                            className='border border-gray-400 rounded-md p-2 w-32 focus:outline-blue'
                            onChange={(e) => handleInputChange(e, i)}
                          />
                          <input
                            type='number'
                            name='price'
                            value={volume[i]?.price}
                            placeholder='RMB'
                            className='border border-gray-400 rounded-md p-2 w-32 focus:outline-blue'
                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className='flex items-center space-x-2'>
                <input
                  disabled={box}
                  type='checkbox'
                  style={{ width: 20, height: 20 }}
                  checked={box}
                  onChange={() => setBox(!box)}
                />
                <label className='font-semibold'>
                  Customer is required to buy per box
                </label>
              </div>
              <div className='text-center'>
                <button
                  className='bg-blue-300 text-white  rounded-md py-2 px-6'
                  onClick={submitRequest}>
                  Update
                </button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
