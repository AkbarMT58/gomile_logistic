import { useState } from 'react';
import {
  IconButton,
  Tooltip,
  Typography,
  Fade,
  Modal,
  Backdrop,
  Box,
} from '@mui/material';
import swal from 'sweetalert';
import CloseIcon from '@mui/icons-material/Close';
import { setTargetContact } from 'service/api';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';

const AddSalesTargetContact = ({ setUpdate, sales }) => {
  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState('');
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const handleChange = (event) => {
    setTarget(event.target.value);
  };

  const putSalesTargetContact = async () => {
    const body = JSON.stringify({ name: sales, targetcontact: Number(target) });

    const data = await setTargetContact(body);

    if (data) {
      setUpdate((prev) => !prev);
      swal('Target added successfully', {
        icon: 'success',
        buttons: false,
        timer: 1000,
      });
      handleClose();
    }
  };

  const addTarget = (e) => {
    e.preventDefault();
    swal({
      title: 'Are you sure?',
      text: 'Once add target, you will not be able to revert this change!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        putSalesTargetContact();
      } else {
        swal('Your canceled to add sales');
        handleClose();
      }
    });
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid lightgray',
    boxShadow: 24,
    borderRadius: '5px',
    p: 4,
  };

  return (
    <>
      <Tooltip title='Add Sales Target Contact'>
        <IconButton onClick={handleOpen}>
          <AddIcCallIcon />
        </IconButton>
      </Tooltip>
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
              Add Target Contact
            </Typography>

            <form
              onSubmit={addTarget}
              className='flex flex-col items-center space-y-2'>
              <input
                value={target}
                type='number'
                onChange={handleChange}
                className='p-2 border border-gray-300 outline-none rounded-md w-full'
              />

              <button
                className='p-2 bg-blue-300 text-white rounded-md  w-full hover:bg-blue-200 transition-alll'
                type='submit'>
                Submit
              </button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default AddSalesTargetContact;
