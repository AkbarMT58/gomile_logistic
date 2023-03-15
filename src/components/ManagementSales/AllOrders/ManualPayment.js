import {
  Box,
  CircularProgress,
  Fade,
  IconButton,
  Modal,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { submitManualPayment } from 'service/api';
import swal from 'sweetalert';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import styled from '@emotion/styled';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

const Input = styled('input')({
  display: 'none',
});

const ManualPayment = ({ status, id_so, totalPrice, setUpdate }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [destAccount, setDestAccount] = useState('');
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const manualPayment = async () => {
    if (image.trim() !== '' && destAccount.trim().length !== 0) {
      const body = JSON.stringify({
        id_so,
        totalPrice,
        image,
        destination_account: destAccount,
      });

      setIsLoading(true);
      const response = await submitManualPayment(body);
      if (response?.status === 200) {
        swal('Success', 'Manual payment created successfully!', 'success');
        setUpdate((prev) => !prev);
        setImage('');
        handleClose();
        setIsLoading(false);
      } else {
        swal('Oops', response.message, 'error');
        setIsLoading(false);
      }
    } else {
      swal('Oops', 'Please Completed all field !', 'error');
    }
  };

  const submitImage = (e) => {
    if (e.target.files[0].size > 3000000) {
      swal('Oops', 'Image size over 3MB', 'error');
      return;
    }
    let formData = new FormData();
    formData.append('gambar', e.target.files[0]);
    fetch(`${process.env.REACT_APP_URL_API_IMAGE_UPLOAD}`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setImage(data.file);
        } else {
          swal('Oops', data.message, 'error');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <div
        className={`text-sm py-2 px-3 rounded-md text-center  ${
          status === 'unpaid' || status === 'canceled'
            ? 'bg-blue-500 cursor-pointer'
            : 'bg-gray-300 cursor-not-allowed'
        } text-white`}
        onClick={() => (status !== 'unpaid' && status !== 'canceled' ? false : handleOpen())}>
        Manual Payment
      </div>
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
          <Box sx={style} className='overflow-y-scroll variant-scroll relative'>
            <div className='flex justify-end absolute top-1 right-2'>
              <IconButton onClick={handleClose} style={{ textAlign: 'right' }}>
                <CloseIcon />
              </IconButton>
            </div>
            <div className='flex flex-col space-y-3'>
              <Typography
                id='transition-modal-title'
                variant='h6'
                component='h2'>
                Manual Payment
              </Typography>

              <div className='w-full space-y-1'>
                <div className='flex'>
                  <p className='w-1/3'>ID SO :</p>{' '}
                  <p className='w-2/3 font-semibold'>{id_so}</p>
                </div>
                <div className='flex'>
                  <p className='w-1/3'>Total Price :</p>
                  <p className='w-2/3  font-semibold'>
                    Rp. {totalPrice.toLocaleString('id-ID')}
                  </p>
                </div>
                <div className='flex'>
                  <label className='w-1/3'>Destination Account :</label>
                  <select
                    onChange={(e) => setDestAccount(e.target.value)}
                    className='w-2/3 border p-1 border-gray-500 rounded-md focus:outline-none'>
                    <option value=''>Choose your destination account</option>
                    <option value='BCA Ocommerce (277 050 5006)'>
                      BCA Ocommerce (277 050 5006)
                    </option>
                    <option value='BCA Ocommerce (277 269 8080)'>
                      BCA Ocommerce (277 269 8080)
                    </option>
                    <option value='BRI Ocommerce (0520 01 000285 30 1)'>
                      BRI Ocommerce (0520 01 000285 30 1)
                    </option>
                    <option value='BCA Guntur (647 051 4289)'>
                      BCA Guntur (647 051 4289)
                    </option>
                  </select>
                </div>
              </div>
              <div
                className={`flex items-center justify-center  rounded-md h-40 w-full border ${
                  image
                    ? 'ring ring-blue-300 border-blue-500'
                    : 'border-gray-300'
                }`}>
                {image ? (
                  <img
                    src={`https://ocistok.co.id/control-panel/foto/${image}`}
                    alt=''
                    className='h-32 object-contain'
                  />
                ) : (
                  <p className='italic text-gray-500'>Image Preview</p>
                )}
              </div>
              {image && <em>{image} uploaded</em>}
              <div className='flex justify-between items-center'>
                <div className='flex mt-2 mb-1 items-center space-x-1'>
                  <label
                    htmlFor='icon-button-file'
                    className='flex items-center text-sm p-2 text-white bg-blue-500  rounded-md space-x-1'>
                    <p>Upload Image</p>
                    <Input
                      accept='image/*'
                      id='icon-button-file'
                      onChange={(e) => submitImage(e)}
                      type='file'
                    />
                    <CameraAltIcon fontSize='small' />
                  </label>
                </div>
                {isLoading ? (
                  <div className='flex items-center justify-center'>
                    <CircularProgress className='text-xs' />
                    <div className='text-center items-center justify-center'>
                      Loading Submit Payment
                    </div>
                  </div>
                ) : (
                  <button
                    className={`text-white text-sm p-2 rounded-md ${'bg-blue-400'} hover:bg-blue-700`}
                    onClick={manualPayment}>
                    Submit Payment
                  </button>
                )}
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ManualPayment;
