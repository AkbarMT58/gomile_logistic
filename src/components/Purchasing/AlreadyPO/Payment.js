import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { updatePaymentData } from 'service/api';
import swal from 'sweetalert';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  minHeight: 550,
  bgcolor: 'background.paper',
  border: '1px solid lightgray',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
};

export default function Payment({
  id,
  invoiceNumber,
  link,
  totalRMB,
  initValue,
  setUpdate,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState({
    note: '',
    paymentNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const updatePayment = async (e) => {
    e.preventDefault();

    setLoading(true);
    setUpdate((prev) => !prev);
    if (paymentData.paymentNumber) {
      const body = JSON.stringify({
        id_so: id,
        invoice: invoiceNumber,
        payment_number: paymentData.paymentNumber,
        note: paymentData.note,
      });
      const data = await updatePaymentData(body);
      if (data?.status === 200) {
        swal('Success', 'Payment number updated successfully', 'success');
        handleClose();
        setUpdate((prev) => !prev);
      } else if (data?.status === 400) {
        swal('Oops', data.message, 'error');
      }
    } else {
      swal('Oops', 'Payment number required !', 'error');
    }
    setLoading(false);
  };

  return (
    <div>
      <div
        className='py-2 px-5 border text-blue-500  text-sm border-blue-500 rounded-md text-center cursor-pointer'
        onClick={() => {
          handleOpen();
        }}>
        Payment
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <div className='flex justify-end -mt-5'>
            <IconButton onClick={handleClose} style={{ textAlign: 'right' }}>
              <CloseIcon />
            </IconButton>
          </div>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Purchase Order For: {id}
          </Typography>
          <div className='flex flex-col space-y-3 my-5'>
            <div className='flex flex-col space-y-1'>
              <label className='text-sm font-semibold'>Invoice Number*</label>
              <input
                type='text'
                disabled={true}
                defaultValue={invoiceNumber}
                className='p-1 rounded-md border border-gray-300'
              />
            </div>
            <div className='flex flex-col space-y-1'>
              <label className='text-sm font-semibold'>Link*</label>
              <input
                type='text'
                disabled={true}
                defaultValue={link}
                className='p-1 rounded-md border border-gray-300'
              />
            </div>
            <div className='flex flex-col space-y-1'>
              <label className='text-sm font-semibold'>Final Total RMB*</label>
              <input
                type='text'
                disabled={true}
                defaultValue={totalRMB}
                className='p-1 rounded-md border border-gray-300'
              />
            </div>
            {initValue && initValue !== 0 ?
              <div className='flex flex-col space-y-1'>
                <label className='text-sm font-semibold'>Initial Total RMB</label>
                <input
                  type='text'
                  disabled={true}
                  defaultValue={initValue}
                  className='p-1 rounded-md border border-gray-300'
                />
              </div>
            : null }
            <div className='flex flex-col space-y-1'>
              <label className='text-sm font-semibold'>Notes</label>
              <input
                name='note'
                value={paymentData.note}
                onChange={handleChange}
                type='text'
                className='p-1 rounded-md border border-gray-300 focus:outline-blue'
              />
            </div>
            <div className='flex flex-col space-y-1'>
              <label className='text-sm font-semibold'>Payment Number*</label>
              <input
                name='paymentNumber'
                value={paymentData.paymentNumber}
                onChange={handleChange}
                type='text'
                className='p-1 rounded-md border border-gray-300 focus:outline-blue'
              />
            </div>
          </div>

          <div className='text-center space-y-3'>
            <hr />
            <button
              onClick={updatePayment}
              disabled={loading}
              className={`${
                loading ? 'bg-gray-500' : 'bg-blue-500'
              } rounded-md p-2 px-4 text-sm text-white`}>
              PAID
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
